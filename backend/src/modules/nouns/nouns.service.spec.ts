import { Test, TestingModule } from '@nestjs/testing';
import { NounsService } from './nouns.service';

describe('NounsService', () => {
  let service: NounsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NounsService],
    }).compile();

    service = module.get<NounsService>(NounsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
