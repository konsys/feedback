import { Test, TestingModule } from '@nestjs/testing';
import { NounsController } from '../nouns.controller';

describe('NounsController', () => {
  let controller: NounsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NounsController],
    }).compile();

    controller = module.get<NounsController>(NounsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
