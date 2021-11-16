import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';
import {
  generateLinkedWordsSquare,
  getAvailableDirections,
  getEmptyRandomArrayIndex,
  getRandomDirection,
} from './utils';

@Injectable()
export class NounsService {
  constructor(
    @InjectRepository(NounsEntity)
    private readonly nounsRepository: Repository<NounsEntity>,
  ) {}

  async getNounByLength(length: number) {
    return await this.nounsRepository.findAndCount({ length });
  }

  public async saveNouns() {
    const fncs = [];
    NOUNS.map((value: string) => {
      const t: Partial<NounsEntity> = {
        value,
        length: value.length,
        firstLetter: value.slice(0, 1),
        endLetter: value.slice(value.length - 1, value.length),
      };
      fncs.push(this.nounsRepository.save(t));
    });

    await Promise.all(fncs);
  }

  public generateSquareByWidth(width: number) {
    const squareArray = generateLinkedWordsSquare(width);

    let randomIndex = getEmptyRandomArrayIndex(squareArray);
    const el = squareArray[randomIndex];

    const word = 'sport';

    squareArray[randomIndex] = {
      ...squareArray[randomIndex],
      value: word[0],
    };
    let availableDirections = getAvailableDirections({
      width,
      xPosition: el.x,
      yPosition: el.y,
    });
    let nextSquare = getRandomDirection(availableDirections);

    for (let i = 1; i < word.length; i++) {
      availableDirections = getAvailableDirections({
        width,
        xPosition: nextSquare.x,
        yPosition: nextSquare.y,
      });
      nextSquare = getRandomDirection(availableDirections);
      randomIndex = getEmptyRandomArrayIndex(squareArray);
      squareArray[randomIndex] = {
        ...squareArray[randomIndex],
        value: word[i],
      };
    }
    return squareArray;
  }
}

export type TPosition = {
  xPosition: number;
  yPosition: number;
  width: number;
};

export type TPositionValue = {
  x: number;
  y: number;
  value: string | null;
};
