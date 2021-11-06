import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';

const MAX_WIDTH = 10;

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
    if (width > MAX_WIDTH || width < 0) {
      throw new BadRequestException(`Width > ${MAX_WIDTH} or < 0`);
    }

    let position: IPosition = {
      width: 0,
      yPosition: 0,
      xPosition: 0,
    };

    let lettersField = {};
    for (let xPosition = 0; xPosition < width; xPosition++) {
      for (let yPosition = 0; yPosition < width; yPosition++) {
        lettersField[`${xPosition}-${yPosition}`] = this.createWordsDirections({
          yPosition,
          xPosition,
          width,
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

  public createWordsDirections(position: IPosition) {
    if (position.xPosition === 0 && position.yPosition === 0) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
      ];
    } else if (
      position.xPosition === position.width - 1 &&
      position.yPosition === 0
    ) {
      return [
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
      ];
    } else if (
      position.xPosition === 0 &&
      position.yPosition === position.width - 1
    ) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    } else if (
      position.xPosition === position.width - 1 &&
      position.yPosition === position.width - 1
    ) {
      return [
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    } else if (
      position.xPosition > 0 &&
      position.xPosition < position.width - 1 &&
      position.yPosition === 0
    ) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
      ];
    } else if (
      position.xPosition === 0 &&
      position.yPosition > 0 &&
      position.yPosition < position.width - 1
    ) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    } else if (
      position.xPosition > 0 &&
      position.xPosition < position.width - 1 &&
      position.yPosition === position.width - 1
    ) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    } else if (
      position.xPosition === position.width - 1 &&
      position.yPosition > 0 &&
      position.yPosition < position.width - 1
    ) {
      return [
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    } else if (
      position.xPosition > 0 &&
      position.xPosition < position.width - 1 &&
      position.yPosition > 0 &&
      position.yPosition < position.width - 1
    ) {
      return [
        `${position.xPosition + 1}-${position.yPosition}`,
        `${position.xPosition - 1}-${position.yPosition}`,
        `${position.xPosition}-${position.yPosition + 1}`,
        `${position.xPosition}-${position.yPosition - 1}`,
      ];
    }
  }
}

export interface IPosition {
  xPosition: number;
  yPosition: number;
  width: number;
}
