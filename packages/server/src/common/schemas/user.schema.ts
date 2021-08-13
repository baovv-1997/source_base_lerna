import { Schema } from './index.schema';

export interface UserSchema extends Schema {
  role?: Role;
}

export enum Role {
  doctor = 'doctor',
  hospital = 'hospital',
  admin = 'admin',
}
