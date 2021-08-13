import { Injectable } from '@nestjs/common';
import Repository from './base.repository';
import { UserSchema } from '../schemas/user.schema';

@Injectable()
export class UserRepository extends Repository<UserSchema> {
  private collectionName: string;

  constructor() {
    const collectionName = 'users';
    super({ collectionString: collectionName, timestamp: true });

    this.collectionName = collectionName;
  }
}
