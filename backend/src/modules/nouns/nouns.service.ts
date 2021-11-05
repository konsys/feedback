import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';

const LETTERS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

@Injectable()
export class NounsService {
  constructor(
    @InjectRepository(NounsEntity)
    private readonly nounsRepository: Repository<NounsEntity>,
  ) {}

  async getNounByLength(length: number) {
    return await this.nounsRepository.findAndCount({ length });
  }

  async generateLinkedWordsSquare(width: number) {
    if (width > LETTERS.length || width < 0) {
      throw new BadRequestException('Wrong width');
    }

    let position: IPosition = {
      widthCornerCaseStart: false,
      widthCornerCaseEnd: false,
      heightCornerCaseStart: false,
      heightCornerCaseEnd: false,
      heightPosition: 0,
      widthPosition: 0,
    };

    let lettersField = {};
    for (let widthPosition = 0; widthPosition < width; widthPosition++) {
      for (let heightPosition = 0; heightPosition < width; heightPosition++) {
        lettersField[`${LETTERS[widthPosition]}${heightPosition}`] =
          this.createWordsDirections({
            heightCornerCaseEnd: heightPosition === LETTERS.length,
            heightCornerCaseStart: heightPosition === 0,
            heightPosition,
            widthPosition,
            widthCornerCaseEnd: widthPosition === LETTERS.length,
            widthCornerCaseStart: widthPosition === 0,
          });
      }
    }
    return lettersField;
  }

  private async saveNouns() {
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

  private randBinary() {
    return Math.round(Math.random());
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private createWordsDirections(position: IPosition) {
    let res = [];

    if (position.widthCornerCaseStart && position.heightCornerCaseStart) {
      res.concat([
        `${LETTERS[position.widthPosition + 1]}${position.heightPosition}`,
        `${LETTERS[position.widthPosition]}${position.heightPosition + 1}`,
      ]);
    } else if (position.widthCornerCaseStart && position.heightCornerCaseEnd) {
      res.concat([
        `${LETTERS[position.widthPosition + 1]}${position.heightPosition}`,
        `${LETTERS[position.widthPosition]}${position.heightPosition - 1}`,
      ]);
    }

    return [];
  }
}

interface IPosition {
  widthPosition: number;
  heightPosition: number;
  widthCornerCaseEnd: boolean;
  widthCornerCaseStart: boolean;
  heightCornerCaseEnd: boolean;
  heightCornerCaseStart: boolean;
}
