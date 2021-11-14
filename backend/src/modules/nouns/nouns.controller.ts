import { Controller, Get, Param } from '@nestjs/common';
import { NounsService } from './nouns.service';

@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @Get(':id')
  async findOne(@Param() { id }: { id: number }) {
    return await this.nounsService.getNounByLength(id);
  }

  @Get('square/:id')
  async getLSquare(@Param() { id }: { id: number }) {
    return this.nounsService.generateSquareByWidth(id);
  }
}
