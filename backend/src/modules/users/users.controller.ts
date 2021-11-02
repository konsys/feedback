import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersEntity } from 'src/entities/users.entity';
import { UsersService } from './users.service';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { EControllersNames } from 'src/params/controllers.names';
import { IRequestWithUser, TTokens, TVkLoginRequest } from './types';
import { IJwtPayload, jwtConstants } from 'src/config';

@Controller(EControllersNames.USERS)
export class UsersController {
  constructor(
    private readonly service: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: IRequestWithUser,
  ): Promise<{ accessToken: string }> {
    const login = await this.authService.login({
      name: req.user.name,
      userId: req.user.userId,
    });

    return login;
  }

  @Post('auth/logout')
  async logout(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<boolean> {
    return await this.service.logout(refreshToken);
  }

  @Post('auth/refresh')
  async refresh(
    @Body() { accessToken }: { accessToken: string },
  ): Promise<{ accessToken: string | null }> {
    const token = await this.service.getToken(accessToken);
    const dt = new Date().getTime();
    if (token && new Date(token.expires).getTime() >= dt) {
      const payload: IJwtPayload = this.authService.createPayload(
        token.name,
        token.userId,
      );
      const accessToken = await this.authService.signJwt(payload);

      const expires = new Date();
      expires.setSeconds(expires.getSeconds() + jwtConstants.refreshExpires);
      token.expires = expires;
      await this.service.saveToken({
        token: token.token,
        userId: token.userId,
        name: token.name,
      });

      return { accessToken };
    }
    if (token) {
      await this.service.deleteToken(accessToken);
    }

    return { accessToken: '' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req: IRequestWithUser): Promise<UsersEntity> {
    const profile = new UsersEntity(
      await this.service.getUser(req.user.userId),
    );
    return profile;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfileById(@Param('id') userId: number): Promise<UsersEntity> {
    const res = new UsersEntity(await this.service.getUser(userId));

    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('creds')
  async getProfileByEmail(@Query('email') email: string): Promise<UsersEntity> {
    const res = new UsersEntity(await this.service.getUserByEmail(email));
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register/code')
  async saveCode(
    @Body()
    { registrationCode, email }: { registrationCode: string; email: string },
  ): Promise<boolean> {
    const emailIsRegistered = await this.service.getUserByEmail(email);

    if (emailIsRegistered && !!emailIsRegistered.isActive) {
      throw new Error('Not registered');
    }

    const res = await this.service.activateUser(registrationCode, email);

    if (!res) {
      throw new Error('Activating error');
    }
    return res;
  }

  @Post('login/vk')
  async loginVk(
    @Body()
    { code }: TVkLoginRequest,
  ): Promise<TTokens> {
    const user = new UsersEntity(await this.service.loginVK(code));
    return await this.authService.login(user);
  }

  @Delete('/:userId')
  async deleteUser(
    @Param()
    { userId }: { userId: number },
  ): Promise<any> {
    const res = await this.service.deleteUser(userId);
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('email/:email')
  async getUserByEmail(
    @Param() email: string,
  ): Promise<UsersEntity | undefined> {
    return await this.service.getUserByEmail(email);
  }

  @Post()
  async saveUsers(@Param() users: UsersEntity[]): Promise<UsersEntity[]> {
    return this.service.saveUsers(users);
  }
}
