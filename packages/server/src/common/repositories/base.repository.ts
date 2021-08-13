import { DocumentCollection, CollectionUpdateOptions } from 'arangojs/collection';
import { aql, Database } from 'arangojs';
import database from '../database/index.database';
import { Schema } from '../schemas/index.schema';

type ComparisonOperator =
  | '=='
  | '!='
  | '<'
  | '<='
  | '>'
  | '>='
  | 'IN'
  | 'NOT IN'
  | 'LIKE'
  | 'NOT LIKE'
  | '=~'
  | '!~'
  | 'ANY IN'
  | 'NONE IN';

export type FilterOperator = {
  property: string;
  operator: ComparisonOperator;
  value: any;
  prefixOperator?: '&&' | '||';
};

interface ICollection {
  collectionString: string;
  timestamp?: boolean;
}

class Repository<T extends Schema> {
  collection: DocumentCollection;
  collectionConfig: {
    timestamp?: boolean;
  };
  database?: Database;

  constructor(collectionName: ICollection) {
    this.collection = database.collection(collectionName.collectionString);
    this.collectionConfig = { timestamp: collectionName.timestamp };
    this.database = database;
  }

  async exists(documentSelector: string): Promise<boolean> {
    try {
      const result = await this.collection.documentExists(documentSelector);

      return result;
    } catch (error) {
      return null;
    }
  }

  async create(item: Partial<T>): Promise<T> {
    try {
      if (this.collectionConfig.timestamp) {
        item.createdAt = Date.now();
        item.updatedAt = Date.now();
      }
      const result = await this.collection.save(item, { overwriteMode: 'update' });

      return { _key: result._key, ...result.new };
    } catch (error) {
      return null;
    }
  }

  async insert(items: Partial<T>[]): Promise<number> {
    try {
      const result = await this.collection.import(items);

      return result.created;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, item: Partial<T>, option?: CollectionUpdateOptions): Promise<T> {
    try {
      if (this.collectionConfig.timestamp) {
        item.updatedAt = Date.now();
      }
      const result = await this.collection.update(id, item, option);
      return result.new;
    } catch (error) {
      return null;
    }
  }

  async updateByValues(filters: FilterOperator[], dataUpdate: Partial<T>): Promise<boolean> {
    try {
      let queryString = `FOR data IN ${this.collection.name}`;
      let bindVars = {};

      if (filters?.length) {
        queryString = `${queryString} FILTER`;

        filters.forEach((filter, index) => {
          queryString = `${queryString} ${filter.prefixOperator || ''} data.${filter.property} ${filter.operator} @value${index}`;
          bindVars = {
            ...bindVars,
            [`value${index}`]: filter.value,
          };
        });
      }
      queryString = `${queryString} UPDATE data WITH ${JSON.stringify(dataUpdate)} IN ${this.collection.name}`;
      await this.database.query(`${queryString}`, bindVars);

      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string): Promise<T> {
    try {
      const result = await this.collection.remove(id);

      return result.old;
    } catch (error) {
      return null;
    }
  }

  async findById(id: string): Promise<T> {
    try {
      const result = await this.collection.document(id);

      return result;
    } catch (error) {
      return null;
    }
  }

  async findCustom<K extends keyof T>(
    filters: FilterOperator[],
    attributes?: K[],
    limit?: number,
    offset?: number,
    sort?: string,
  ): Promise<{ items: T[]; total: number }> {
    try {
      let queryString = `FOR data IN ${this.collection.name}`;

      if (filters.length) {
        queryString = `${queryString} FILTER`;
      }

      let bindVars = {};

      filters.forEach((filter, index) => {
        let filterProperty = `data.${filter.property}`;

        if (filter?.property?.includes('[')) {
          filterProperty = `data${filter.property}`;
        }

        queryString = `${queryString} ${filter.prefixOperator || ''} ${filterProperty} ${filter.operator} @value${index}`;
        bindVars = {
          ...bindVars,
          [`value${index}`]: filter.value,
        };
      });

      if (sort) {
        queryString = `${queryString} SORT data.createdAt ${sort}`;
      }

      if (limit >= 1) {
        queryString = `${queryString} LIMIT`;
        if (offset >= 1) {
          queryString = `${queryString} ${offset}, ${limit}`;
        } else {
          queryString = `${queryString} ${limit}`;
        }
      }

      let valueQuery = 'data';

      if (attributes) {
        valueQuery = '';
        attributes.forEach((item, index) => {
          valueQuery += `${item}: data.${item}`;
          if (index < attributes.length - 1) {
            valueQuery += ',';
          }
        });
        valueQuery = `{ ${valueQuery} }`;
      }

      queryString = `${queryString} RETURN ${valueQuery} `;

      const result = await this.database.query(`${queryString}`, bindVars, { fullCount: true });

      return { items: await result.all(), total: result.extra.stats.fullCount };
    } catch (error) {
      return { items: [], total: 0 };
    }
  }

  async find<K extends keyof T>(filters: FilterOperator[], limit?: number, attributes?: K[]): Promise<T[]> {
    const { items } = await this.findCustom(filters, attributes, limit, 0, 'ASC');
    return items;
  }

  async findOne<K extends keyof T>(filters: FilterOperator[], attributes?: K[]): Promise<T> {
    const result = await this.find(filters, 1, attributes);

    if (!result?.length) {
      return null;
    }

    return result[0];
  }

  async getAll(): Promise<T[]> {
    try {
      const result = await this.database.query(aql`
      FOR doc IN ${this.collection}
      RETURN doc
    `);

      return result.all();
    } catch (error) {
      return null;
    }
  }

  async pagination<K extends keyof T>(
    page: number,
    perPage: number,
    filters?: FilterOperator[],
    attributes?: K[],
  ): Promise<{ items: T[]; pagination: { total: number; page: number; perPage: number } }> {
    try {
      if (page === -1) {
        perPage = -1;
      }

      const offset = (page - 1) * perPage;

      const { items, total } = await this.findCustom(filters, attributes, perPage, offset, 'DESC');

      return { items, pagination: { total: total, page, perPage } };
    } catch (error) {
      return { items: [], pagination: { total: 0, page, perPage } };
    }
  }

  async findWithCustomQuery<K extends keyof T>(
    { filterString, bindVars },
    attributes?: K[],
    limit?: number,
    offset?: number,
    sort = 'ASC' as string,
  ): Promise<{ items: T[]; total: number }> {
    try {
      let queryString = `FOR data IN ${this.collection.name}`;
      queryString = `${queryString} ${filterString}`;

      if (sort) {
        queryString = `${queryString} SORT data.createdAt ${sort}`;
      }

      if (limit >= 1) {
        queryString = `${queryString} LIMIT`;
        if (offset >= 1) {
          queryString = `${queryString} ${offset}, ${limit}`;
        } else {
          queryString = `${queryString} ${limit}`;
        }
      }

      let valueQuery = 'data';
      if (attributes) {
        valueQuery = '';
        attributes.forEach((item, index) => {
          valueQuery += `${item}: data.${item}`;
          if (index < attributes.length - 1) {
            valueQuery += ',';
          }
        });
        valueQuery = `{ ${valueQuery} }`;
      }

      queryString = `${queryString} RETURN ${valueQuery} `;

      const result = await this.database.query(`${queryString}`, bindVars, { fullCount: true });
      return { items: await result.all(), total: result.extra.stats.fullCount };
    } catch (error) {
      return { items: [], total: 0 };
    }
  }
}

export default Repository;
