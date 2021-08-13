import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from 'common/schemas/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private role: Role[]) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();

    return this.role.includes(user?.role);
  }
}
