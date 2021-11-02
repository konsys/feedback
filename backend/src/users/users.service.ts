import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TUserCreds, TVkAuthResponse, TVkGetUserResponce } from './types';
import { stringify } from 'query-string';
import { TokensEntity } from 'src/entities/tokens.entity';
import {
  getVkAccessTokenRequest,
  getVkGetUserRequest,
  jwtConstants,
  VkAppParams,
} from 'src/config';
import { client } from 'src/http/client';

// rCd8cviaoYS9AV1CyA8h
@Injectable()
export class UsersService {
  private logger: Logger = new Logger('UsersService');

  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    @InjectRepository(TokensEntity)
    private readonly tokens: Repository<TokensEntity>,
  ) {}

  async getAllUsers(filter?: FindManyOptions): Promise<UsersEntity[]> {
    try {
      filter = { ...filter, skip: 1 };
      const users: any = await this.users.find(filter);
      return users;
    } catch (err) {
      this.logger.log(`Error: ${err}`);
    }
  }

  async getUser(userId: number): Promise<UsersEntity | undefined> {
    const user: UsersEntity = await this.users.findOne(userId);

    return new UsersEntity(user);
  }

  async getUsersByIds(userIds: number[]): Promise<UsersEntity[]> {
    // https://github.com/typeorm/typeorm/blob/master/docs/find-options.md
    const users: UsersEntity[] = await this.users.find({
      userId: In(userIds),
    });

    const filtered = users.map((v) => new UsersEntity(v));
    return filtered;
  }

  async getUserByCredentials({
    email,
    password,
  }: Partial<TUserCreds>): Promise<UsersEntity> {
    const user: UsersEntity = await this.users.findOne({ email, password });
    return user;
  }

  async getUserByEmail(email: string): Promise<UsersEntity> {
    const user: UsersEntity = await this.users.findOne({ email });
    return user;
  }

  async updateUser(user: UsersEntity): Promise<boolean> {
    user = new UsersEntity(user);
    const update = await this.users.update({ userId: user.userId }, user);

    return update && update.affected > 0 ? true : false;
  }

  async saveUser(user: UsersEntity): Promise<UsersEntity> {
    user = new UsersEntity(user);
    const savedUser = await this.users.save({
      ...user,
      vip: !!user.vip,
    });

    return savedUser;
  }

  async activateUser(
    registrationCode: string,
    email: string,
  ): Promise<boolean> {
    const user: UsersEntity = await this.users.findOne({
      registrationCode,
      email,
    });

    if (!user) {
      throw new Error('No user found');
    }

    const res = await this.users.update(
      { registrationCode, email },
      { isActive: true },
    );

    return res && res.affected > 0 ? true : false;
  }
  async saveUsers(users: UsersEntity[]): Promise<UsersEntity[]> {
    const allUsers: UsersEntity[] = await this.users.save(users);
    return allUsers;
  }

  async loginVK(code: string): Promise<UsersEntity | null> {
    const { serviceKey } = VkAppParams;

    const link = `${VkAppParams.tokenURL}${stringify(
      getVkAccessTokenRequest(code),
    )}`;

    let tokenData = {} as TVkAuthResponse;
    try {
      tokenData = (await client.get<TVkAuthResponse>(link)).data;
    } catch (err) {
      if (err?.response?.data) {
        throw new BadRequestException(err?.response?.data);
      }
      throw new BadRequestException('Auth error');
    }

    const userGetLink = `https://api.vk.com/method/users.get?${stringify(
      getVkGetUserRequest({
        access_token: tokenData.access_token,
        fields: 'sex,bdate,photo_100,email',
        userId: tokenData.user_id,
      }),
    )}`;

    // TODO доделать получение данных по авторизируемому пользователю
    const user = (
      await client.get<TVkGetUserResponce>(userGetLink)
    ).data.response.pop();

    const isUser = await this.users.findOne({ vkId: user.id });
    let savedUser = null;
    if (user) {
      if (!isUser) {
        savedUser = await this.users.save({
          avatar: user.photo_100,
          firstName: user.first_name,
          lastName: user.last_name,
          registrationType: 'vk',
          name: user.first_name,
          isActive: true,
          isBlocked: false,
          sex: user.sex,
          vip: false,
          vkId: user.id,
          email: null,
        });
      } else if (isUser && isUser.userId) {
        await this.users.update(
          { vkId: user.id },
          {
            avatar: user.photo_100,
            firstName: user.first_name,
            lastName: user.last_name,
            registrationType: 'vk',
            name: user.first_name,
            isActive: true,
            isBlocked: false,
            sex: user.sex,
            vip: false,
            email: null,
          },
        );
        savedUser = await this.users.findOne({ vkId: user.id });
      }
    }

    return savedUser;
  }

  async getToken(token: string): Promise<TokensEntity> {
    const res: TokensEntity = await this.tokens.findOne({ token });
    return res;
  }

  async saveToken({
    token,
    userId,
    name,
  }: {
    token: string;
    userId: number;
    name: string;
  }): Promise<TokensEntity> {
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + jwtConstants.refreshExpires);

    const tokenToSave: TokensEntity = {
      userId,
      name,
      expires,
      token,
    };

    let res = null;

    try {
      res = await this.tokens.save(tokenToSave);
    } catch (err) {
      res = await this.tokens.update({ userId }, { expires, token });
    }

    return res;
  }

  async deleteToken(token: string): Promise<boolean> {
    try {
      const res = await this.tokens.delete({ token });
      return res.affected > 0;
    } catch (err) {
      console.log('Error deleting refresh token', err);
      return false;
    }
  }

  async logout(token: string): Promise<boolean> {
    try {
      const res = await this.tokens.delete({ token });
      return res.affected > 0;
    } catch (err) {
      console.log('Error deleting refresh token', err);
      return false;
    }
  }

  async deleteUser(userId: number): Promise<boolean> {
    try {
      const res = await this.users.delete({ userId, isTestUser: true });
      return res.affected > 0;
    } catch (err) {
      console.log('Error deleting user', err);
      return false;
    }
  }
}
