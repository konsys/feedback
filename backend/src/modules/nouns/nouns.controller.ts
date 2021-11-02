import { Controller, Get } from '@nestjs/common';
import { NOUNS } from './nouns';

@Controller('nouns')
export class NounsController {
  @Get()
  findAll(): string {
    return NOUNS.join(', ');
  }
}
