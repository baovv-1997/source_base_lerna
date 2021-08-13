import { CanActivate, ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { IDataSign } from 'common/types/dataSign.type';
import { Role } from 'common/schemas/user.schema';
import { Reflector } from '@nestjs/core';
@Injectable()
export class AuthenticateUser implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest() as any;
    let token: string = (request.headers['x-access-token'] || request.headers.authorization || '') as string;

    const bearerPrefix = 'Bearer ';
    if (token.startsWith(bearerPrefix)) {
      token = token.slice(bearerPrefix.length, token.length);
    }

    if (token) {
      try {
        request.user = {} as IDataSign;

        return true;
      } catch (ex) {
        if (ex.code === 'auth/id-token-expired') {
          throw {
            status: HttpStatus.PAYMENT_REQUIRED,
            message: 'Token expired',
            data: null,
          };
        }

        throw {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized user!',
          data: null,
        };
      }
    }

    throw {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized user!',
      data: null,
    };
  }
}
