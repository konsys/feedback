import { Controller, Get } from '@nestjs/common';
import { NounsService } from './nouns.service';

@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @Get()
  async findAll() {
    return await this.nounsService.getNounByLength(3);
  }
}
