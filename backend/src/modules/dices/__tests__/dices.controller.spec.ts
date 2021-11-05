import { Test, TestingModule } from '@nestjs/testing';
import { DicesController } from '../dices.controller';

describe('UsersController', () => {
  let controller: DicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DicesController],
    }).compile();

    controller = module.get<DicesController>(DicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
