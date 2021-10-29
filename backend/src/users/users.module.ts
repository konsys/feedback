import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jwtConstants } from 'src/config';
import { TokensEntity } from 'src/entities/tokens.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, TokensEntity]),
    // TODO Remove doubling import module with auth module
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expires },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
