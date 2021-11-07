import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NOUNS } from './nouns';

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
}

export interface IPosition {
  xPosition: number;
  yPosition: number;
  width: number;
}

export interface IPositionValue {
  x: number;
  y: number;
  value: string | null;
}
