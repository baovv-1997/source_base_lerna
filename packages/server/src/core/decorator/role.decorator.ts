import { SetMetadata } from '@nestjs/common';
import { Role } from 'common/schemas/user.schema';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]): any => SetMetadata(ROLES_KEY, roles);
