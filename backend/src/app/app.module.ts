import { Module } from '@nestjs/common';
import { DicesModule } from 'src/dices/dices.module';
import { UsersModule } from 'src/users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [UsersModule, DicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
