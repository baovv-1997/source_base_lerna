import { HttpStatus } from '@nestjs/common';
import { ISuccessResponseData, IFailResponseData } from 'common/types/response.type';

export const buildSuccessResponse = (dataResponse: ISuccessResponseData): any => {
  const dataResponseCus: ISuccessResponseData = {};

  dataResponseCus.statusCode = dataResponse?.statusCode || HttpStatus.OK;
  dataResponseCus.message = dataResponse?.message || '';
  dataResponseCus.data = dataResponse?.data || null;
  dataResponseCus.success = true;

  return dataResponseCus;
};

export const buildFailResponse = (dataResponse: IFailResponseData): any => {
  const dataResponseCus: IFailResponseData = {} as IFailResponseData;

  dataResponseCus.statusCode = dataResponse?.statusCode || HttpStatus.BAD_REQUEST;
  dataResponseCus.message = dataResponse?.message || '';
  dataResponseCus.data = dataResponse?.data || null;
  dataResponseCus.success = false;

  return dataResponseCus;
};
