import { Role } from 'common/schemas/user.schema';

export interface IDataSign {
  uid: string;
  email?: string;
  role?: Role;
  emailVerified?: boolean;
  signInProvider?: string;
}
