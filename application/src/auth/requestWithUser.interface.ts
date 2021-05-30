import { Request } from 'express';
import { User } from './User.interface';

export interface RequestWithUser extends Request {
  user: User;
}
