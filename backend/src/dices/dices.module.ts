import { Module } from '@nestjs/common';
import { DicesController } from './dices.controller';

@Module({
  controllers: [DicesController],
})
export class DicesModule {}
