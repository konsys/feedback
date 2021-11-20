import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';
import { generateLinkedWordsSquare, getEmptyRandomArrayIndex } from './utils';

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
    const word = 'tresk';
    let randomIndex = 0;

    squareArray[randomIndex] = {
      ...squareArray[randomIndex],
      value: word[randomIndex],
    };

    for (let i = 1; i < word.length; i++) {
      const el = squareArray[randomIndex];

      randomIndex = getEmptyRandomArrayIndex(squareArray, {
        width,
        xPosition: el.x,
        yPosition: el.y,
      });

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
