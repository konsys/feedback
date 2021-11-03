import { Controller, Get, Param } from '@nestjs/common';
import { NounsService } from './nouns.service';

@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @Get(':id')
  async findOne(@Param() { id }: { id: number }) {
    console.log(1111111111, id);
    return await this.nounsService.getNounByLength(id);
  }
}
