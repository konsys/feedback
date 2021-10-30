import { Request as ExpressRequest } from 'express';

export interface IRequestWithUser extends ExpressRequest {
  user: {
    userId: number;
    name: string;
  };
}

export type TUserCreds = {
  email?: string;
  name?: string;
  password?: string;
  userId?: number;
};

export type TVkUserResponce = {
  id: number;
  email?: string;
  sex: number;
  bdate: string;
  photo_100: string;
  last_name: string;
  first_name: string;
  can_access_closed: boolean;
  is_closed: boolean;
};

export type TVkToken = {
  access_token: string;
  expires_in: number;
  user_id: number;
  email?: string;
};

export type TVkLoginRequest = {
  code: string;
};

export type TTokens = { accessToken: string; refreshToken: string };

export type TVkTokenResponce = {
  access_token: string;
  email: string;
  user_id: string;
};

export type TVkTokenError = {
  error: string;
  error_description: string;
};
