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

  async saveNounsToDB() {
    const fncs = [];
    const nounsMap: Partial<NounsEntity>[] = NOUNS.map((value) => {
      fncs.push(
        this.nounsRepository.save({
          value,
          length: value.length,
        }),
      );
      return {
        value,
        length: value.length,
      };
    });

    await Promise.all(fncs);

    // try {
    //   await this.nounsRepository.save(nounsMap);
    // } catch (err) {
    //   console.log(22222222, err);
    //   // NOP
    // }
    return await this.nounsRepository.findOne(2);
  }
}
