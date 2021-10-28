import { Module } from '@nestjs/common';
import { DicesModule } from 'src/dices/dices.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'mnpl',
      password: 'mnpl',
      database: 'mnpl',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: ['error'],
    }),
    UsersModule,
    DicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
