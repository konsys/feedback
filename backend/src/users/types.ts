import { Request as ExpressRequest } from 'express';

export interface RequestWithUser extends ExpressRequest {
  user: {
    userId: number;
    name: string;
  };
}

export interface IUserCreds {
  email?: string;
  name?: string;
  password?: string;
  userId?: number;
}
