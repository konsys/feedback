import { Module } from '@nestjs/common';
import { DicesModule } from 'src/modules/dices/dices.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { NounsModule } from 'src/modules/nouns/nouns.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'mnpl',
      password: 'mnpl',
      database: 'mnpl',
      entities: [`${__dirname}/../../entities/*.entity{.ts,.js}`],
      synchronize: true,
      // logging: ['error'],
    }),
    DicesModule,
    AuthModule,
    UsersModule,
    NounsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
