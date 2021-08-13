import { ISuccessResponseData, IFailResponseData } from 'common/types/response.type';
import * as responseUtil from '../response/index.response';
import { isFunction, isNumber, isString, isObject } from 'lodash';

export class BaseController {
  public successResponse(dataResponse?: ISuccessResponseData, dataResponseModel?: { [key: string]: any }) {
    dataResponse = {
      ...dataResponse,
      data: this.pickData(dataResponse?.data, dataResponseModel),
    };

    return responseUtil.buildSuccessResponse(dataResponse);
  }

  public failResponse(dataResponse: IFailResponseData): any {
    return responseUtil.buildFailResponse(dataResponse);
  }

  private pickParam(data, dataResponseModel: { [key: string]: any }) {
    const dataTemp = {};

    if (!dataResponseModel) {
      return data;
    }

    Object.keys(dataResponseModel).map((key) => {
      let cusKey = key;

      if (Array.isArray(dataResponseModel[key])) {
        if (Array.isArray(data[key])) {
          dataTemp[key] = data[key].map((dataEle) => this.pickParam(dataEle, dataResponseModel[key][0]));
        } else {
          dataTemp[key] = null;
        }
      }

      if (isObject(dataResponseModel[key]) && !Array.isArray(dataResponseModel[key])) {
        if (isObject(data[key])) {
          dataTemp[key] = this.pickParam(data[key], dataResponseModel[key]);
        }
      }

      if (isFunction(dataResponseModel[key])) {
        if (data[key]) {
          dataTemp[key] = data[key];
        } else {
          const func = dataResponseModel[key];
          const result = func();

          if (result?.key) {
            dataTemp[key] = data[result.key] || null;
          } else {
            dataTemp[key] = result;
          }
        }
      }

      if (isString(dataResponseModel[key]) || isNumber(dataResponseModel[key])) {
        if (dataResponseModel[key]) {
          cusKey = dataResponseModel[key];
        }

        if (typeof data[cusKey] != 'undefined') {
          dataTemp[key] = data[cusKey];
        } else {
          dataTemp[key] = typeof dataResponseModel[key] == 'number' ? 0 : null;
        }
      }
    });

    return dataTemp;
  }

  private pickData(data: any, dataResponseModel: { [key: string]: any }) {
    if (!data) {
      return data;
    }

    if (Array.isArray(data)) {
      const dataRes = { items: data };

      if (dataResponseModel) {
        dataRes.items = data.map((item) => {
          return this.pickParam(item, dataResponseModel);
        });
      }

      return dataRes;
    }

    if (!dataResponseModel) {
      return data;
    }

    if (data.pagination) {
      if (Array.isArray(data.items)) {
        const itemsTemp = data.items.map((item) => {
          return this.pickParam(item, dataResponseModel);
        });

        return { ...data, items: itemsTemp };
      }
    }

    return this.pickParam(data, dataResponseModel);
  }
}
