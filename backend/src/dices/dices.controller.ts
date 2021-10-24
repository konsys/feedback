import { Controller, Get } from '@nestjs/common';
import { randomDice } from 'src/utils';
import { TDices } from './types';

@Controller('dices')
export class DicesController {
  @Get()
  findAll(): TDices {
    const d1 = randomDice();
    const d2 = randomDice();
    return {
      dice1: d1,
      dice2: d2,
      dicesSum: d1 + d2,
      isShown: true,
      rolling: false,
    };
  }
}
