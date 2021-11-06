// describe('Nouns service test', () => {
//   it('should ', () => {
//     expect(1).toBe(1);
//   });
// });

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NounsService } from '../nouns.service';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

//
const repositoryMockFactory: () => MockType<Repository<NounsEntity>> = jest.fn(
  () => ({
    findAndCount: jest.fn((entity) => entity),
  }),
);

let service: NounsService;
let repositoryMock: MockType<Repository<NounsEntity>>;

describe('TestservicepackService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NounsService,
        {
          provide: getRepositoryToken(NounsEntity),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    service = module.get<NounsService>(NounsService);
    repositoryMock = module.get(getRepositoryToken(NounsEntity));
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should find a user', async () => {
    const noun: NounsEntity[] = [
      {
        endLetter: 'a',
        firstLetter: 'f',
        length: 6,
        nounId: 2,
        value: 'qwerty',
      },
    ];

    repositoryMock.findAndCount.mockReturnValue(noun);

    expect(await service.getNounByLength(5)).toEqual(noun);

    expect(repositoryMock.findAndCount).toHaveBeenCalledWith({ length: 5 });
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 0,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual(['1-0', '0-1']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 9,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual(['8-0', '9-1']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 0,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual(['1-9', '0-8']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 9,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual(['8-9', '9-8']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 5,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual(['6-0', '4-0', '5-1']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 0,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual(['1-5', '0-6', '0-4']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 5,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual(['6-9', '4-9', '5-8']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 9,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual(['8-5', '9-6', '9-4']);
  });

  it('createWordsDirections tests', () => {
    const res = service.createWordsDirections({
      xPosition: 5,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual(['6-5', '4-5', '5-6', '5-4']);
  });

  it('generateLinkedWordsSquare tests', async () => {
    const res = await service.generateLinkedWordsSquare(5);

    expect(res).toStrictEqual(8);
  });
});
