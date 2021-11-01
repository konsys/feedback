import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { FindManyOptions, In, Repository } from 'typeorm';
import { UsersEntity } from 'src/entities/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TUserCreds, TVkUserResponce, TVkAuthResponse } from './types';
import { stringify } from 'query-string';
import { TokensEntity } from 'src/entities/tokens.entity';
import { getVkAccessTokenRequest, jwtConstants, VkAppParams } from 'src/config';
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
    console.log(44444444, code);

    const { serviceKey } = VkAppParams;

    const link = `${VkAppParams.tokenURL}${stringify(
      getVkAccessTokenRequest(code),
    )}`;

    let tokenData = {} as TVkAuthResponse;

    try {
      tokenData = (await client.get<TVkAuthResponse>(link)).data;
    } catch (err) {
      console.log(8888888, err?.response?.data);
      if (err?.response?.data) {
        throw new BadRequestException(err?.response?.data);
      }
      throw new BadRequestException('Auth error');
    }

    const userData = {
      // user_ids: tokenData.user_id,
      access_token: serviceKey,
      // access_token: tokenData.access_token,
      // client_id,
      // fields: 'sex,bdate,photo_100,email',
      fields: 'email',
      // v,
    };

    const userGetLink = `https://api.vk.com/method/users.get?${stringify(
      userData,
    )}`;

    console.log(1111111, (await client.get<any>(userGetLink)).data);

    const userResponse = (await client.get<any>(userGetLink)).data;

    console.log(33333333, userGetLink);

    const res: any = await userResponse.json();
    if (res.error) {
      console.log(11111111111, tokenData);
    }

    const usersData: TVkUserResponce[] = JSON.parse(res).response;

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
