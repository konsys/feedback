import { Controller, Get } from '@nestjs/common';
import { NOUNS } from './nouns';
import { NounsService } from './nouns.service';

@Controller('nouns')
export class NounsController {
  constructor(private readonly nounsService: NounsService) {}

  @Get()
  async findAll() {
    return await this.nounsService.saveNounsToDB();
  }
}
