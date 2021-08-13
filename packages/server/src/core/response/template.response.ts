/* eslint-disable @typescript-eslint/ban-types */
import { ApiProperty } from '@nestjs/swagger';

class ResponseTemplate<Entity> {
  @ApiProperty({ type: Object })
  public data: Entity | any;

  @ApiProperty()
  public statusCode?: number;

  @ApiProperty()
  public message?: string;

  @ApiProperty()
  public success?: boolean;
}

class Pagination {
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  perPage: number;
}

export class PaginationRequest {
  @ApiProperty({ required: false })
  perPage: number;

  @ApiProperty({ required: false })
  page: number;
}

type Entity = Function;

export function getTemplateResponseFor(type?: Entity, isPagination?: boolean, isArray?: boolean): typeof ResponseTemplate {
  if (!type) {
    class Response extends ResponseTemplate<Entity> {
      @ApiProperty()
      public data: null;
    }

    return Response;
  }

  if (isArray) {
    return getTemplateResponseForArray(type);
  }

  if (isPagination) {
    return getTemplateResponseForPagination(type);
  }

  class GetTemplateResponseForEntity<Entity> extends ResponseTemplate<Entity> {
    @ApiProperty({ type })
    public data: Entity;
  }

  Object.defineProperty(GetTemplateResponseForEntity, 'name', {
    value: `GetTemplateResponseFor${type.name}`,
  });

  return GetTemplateResponseForEntity;
}

export function getTemplateResponseForPagination(type: Entity): typeof ResponseTemplate {
  class ResponseDataTemplatePagination {
    @ApiProperty({ type, isArray: true })
    public items: Entity[];

    @ApiProperty({ type: Pagination })
    public pagination?: Pagination;
  }

  class GetTemplateResponseForEntity<Entity> extends ResponseTemplate<Entity> {
    @ApiProperty({ type: ResponseDataTemplatePagination })
    public data: ResponseDataTemplatePagination;
  }

  Object.defineProperty(GetTemplateResponseForEntity, 'name', {
    value: `GetTemplateResponseFor${type.name}`,
  });

  return GetTemplateResponseForEntity;
}

export function getTemplateResponseForArray(type: Entity): typeof ResponseTemplate {
  class ResponseDataTemplateArray {
    @ApiProperty({ type, isArray: true })
    public items: Entity[];
  }

  class GetTemplateResponseForEntity<Entity> extends ResponseTemplate<Entity> {
    @ApiProperty({ type: ResponseDataTemplateArray })
    public data: ResponseDataTemplateArray;
  }

  Object.defineProperty(GetTemplateResponseForEntity, 'name', {
    value: `GetTemplateResponseFor${type.name}`,
  });

  return GetTemplateResponseForEntity;
}

export function getSchemaResponse(code: number): ResponseTemplate<null> {
  return {
    data: null,
    statusCode: code,
    message: '',
    success: false,
  };
}
