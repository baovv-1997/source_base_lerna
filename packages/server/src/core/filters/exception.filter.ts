import { Catch, ArgumentsHost, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { logger } from '../logger/index.logger';

import * as responseUtil from '../response/index.response';

@Catch()
export default class ExceptionFilter extends BaseExceptionFilter {
  doNotReport(): Array<any> {
    return [NotFoundException, UnauthorizedException];
  }

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();

    try {
      const validationRes = validateException(error);

      const cusError = {
        status: validationRes.status || HttpStatus.BAD_REQUEST,
        message: validationRes.message || '',
        data: validationRes.data || null,
      };

      if (error instanceof TypeError) {
        logger.error(`StatusCode : ${cusError.status}, Message : ${cusError.message}, detail : ${error.stack}`);
      } else {
        logger.error(`StatusCode : ${cusError.status}, Message : ${cusError.message}`);
      }

      if (error instanceof TypeError) {
        cusError.status = HttpStatus.INTERNAL_SERVER_ERROR;
        cusError.message = 'Something went wrong. Please try again later';
        cusError.data = null;
      }

      return response.status(HttpStatus.OK).send(
        responseUtil.buildFailResponse({
          statusCode: cusError.status,
          message: cusError.message,
          data: cusError.data,
        }),
      );
    } catch (ex) {
      return response.status(HttpStatus.OK).send(
        responseUtil.buildFailResponse({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Something went wrong. Please try again later',
        }),
      );
    }
  }
}

const validateException = (exceptionData: any): { status: number; message: string; data: any } => {
  if (!exceptionData?.response) {
    return exceptionData;
  }

  const validationRes = exceptionData?.response;

  if (typeof validationRes !== 'object') {
    return exceptionData;
  }

  return {
    status: validationRes.statusCode,
    message: validationRes.error,
    data: { errors: validationRes.message },
  };
};
