import { Module } from '@nestjs/common';
import { NounsController } from './nouns.controller';
import { NounsService } from './nouns.service';

@Module({
  controllers: [NounsController],
  providers: [NounsService]
})
export class NounsModule {}
