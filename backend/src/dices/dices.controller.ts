import { Controller, Get } from '@nestjs/common';
import { randomDice } from 'src/utils';
import { TDices } from 'src/utils/types';

export type TDicesResponce = {
  dices: TDices;
};

@Controller('dices')
export class DicesController {
  @Get()
  findAll(): TDicesResponce {
    return {
      dices: {
        dice1: randomDice(),
        dice2: randomDice(),
      },
    };
  }
}
