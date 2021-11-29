import { Injectable } from '@nestjs/common';
import { shuffle, flatten } from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';
import {
  addWordsToSquare,
  fillEmptySquares,
  generateLinkedWordsSquare,
  getRandomArbitrary,
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

  async getRandomNounsByLength(length: number, take: number) {
    const end = await this.nounsRepository.count({ where: { length } });
    return await this.nounsRepository.find({
      skip: getRandomArbitrary(0, end - 1),
      take,
      where: { length },
    });
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

  public async generateSquareByWidth(width: number) {
    const names = await Promise.all([
      this.getRandomNounsByLength(9, 50),
      this.getRandomNounsByLength(8, 50),
      this.getRandomNounsByLength(7, 50),
      this.getRandomNounsByLength(9, 50),
      this.getRandomNounsByLength(5, 50),
      this.getRandomNounsByLength(4, 50),
    ]);

    const arr = shuffle(flatten(names).map((v) => v.value)).slice(0, 7);

    const squareArray = generateLinkedWordsSquare(width);
    try {
      const ar = addWordsToSquare(squareArray, arr);
      console.log(ar.words);
      return fillEmptySquares(ar.wordsSquare);
    } catch (err) {
      return squareArray;
    }
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
