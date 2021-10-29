import { Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TUserCreds, TVkUserResponce, TVkToken } from './types';
import { stringify } from 'query-string';
import { TokensEntity } from 'src/entities/tokens.entity';
import { jwtConstants } from 'src/config';
import fetch from 'node-fetch';

//
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
    const params = {
      redirect_uri: 'http://127.0.0.1:3000/login',
      client_secret: 'tCN1UAM5eoVrBWtHSMw1',
      client_id: 7731384,
      code,
      v: 5.126,
    };

    const link = `https://oauth.vk.com/access_token?${stringify(params)}`;
    const response = await fetch(link);
    const tokenData: TVkToken = JSON.parse(await response.text());

    console.log(333333333333333, tokenData, code);
    const userData = {
      user_ids: tokenData.user_id,
      access_token: tokenData.access_token,
      client_id: 7731384,
      fields: 'sex,bdate,photo_100,email',
      v: 5.126,
    };

    const userGet = `https://api.vk.com/method/users.get?${stringify(
      userData,
    )}`;

    const userResponse = await fetch(userGet);

    const res: any = await userResponse.json();
    if (res.error) {
      console.log(11111111111, tokenData);
    }

    // try {
    const usersData: TVkUserResponce[] = JSON.parse(res).response;
    // } catch (error) {
    //   console.log(11111111111, error);
    // }
    const user = userData && usersData.length ? usersData[0] : null;
    userData;
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
          email: tokenData.email || null,
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
            email: tokenData.email || null,
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

    const saveToken: TokensEntity = {
      userId,
      name,
      expires,
      token,
    };

    let res = null;
    try {
      res = await this.tokens.save(saveToken);
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
