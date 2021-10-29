import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokensEntity } from 'src/entities/tokens.entity';
import { UsersEntity } from 'src/entities/users.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, TokensEntity]), AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
