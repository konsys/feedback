import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { NounsController } from './nouns.controller';
import { NounsService } from './nouns.service';

@Module({
  imports: [TypeOrmModule.forFeature([NounsEntity])],
  controllers: [NounsController],
  providers: [NounsService],
})
export class NounsModule {}
