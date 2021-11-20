import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NounsService } from '../nouns.service';
import {
  generateLinkedWordsSquare,
  getAvailableDirections,
  getEmptyRandomArrayIndex,
} from '../utils';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

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

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 0,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 1, y: 0, value: null },
      { x: 0, y: 1, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 9,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 8, y: 0, value: null },
      { x: 9, y: 1, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 0,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 1, y: 9, value: null },
      { x: 0, y: 8, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 9,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 8, y: 9, value: null },
      { x: 9, y: 8, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 5,
      yPosition: 0,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 6, y: 0, value: null },
      { x: 4, y: 0, value: null },
      { x: 5, y: 1, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 0,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 1, y: 5, value: null },
      { x: 0, y: 6, value: null },
      { x: 0, y: 4, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 5,
      yPosition: 9,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 6, y: 9, value: null },
      { x: 4, y: 9, value: null },
      { x: 5, y: 8, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 9,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 8, y: 5, value: null },
      { x: 9, y: 6, value: null },
      { x: 9, y: 4, value: null },
    ]);
  });

  it('getAvailableDirections tests', () => {
    const res = getAvailableDirections({
      xPosition: 5,
      yPosition: 5,
      width: 10,
    });
    expect(res).toStrictEqual([
      { x: 6, y: 5, value: null },
      { x: 4, y: 5, value: null },
      { x: 5, y: 6, value: null },
      { x: 5, y: 4, value: null },
    ]);
  });

  it('should generate Linked Words Square', () => {
    let width = 3;
    let squareArray = generateLinkedWordsSquare(width);
    expect(squareArray.length).toBe(width * width);

    width = 4;
    squareArray = generateLinkedWordsSquare(width);
    expect(squareArray.length).toBe(width * width);

    squareArray = generateLinkedWordsSquare(width);
    expect(squareArray[0].value).toBe(null);

    squareArray = generateLinkedWordsSquare(width);
    expect(squareArray[width - 1].value).toBe(null);

    squareArray = generateLinkedWordsSquare(width, 'wefwegvwfgwef');
    expect(squareArray[0].value).toBe('wefwegvwfgwef');

    squareArray = generateLinkedWordsSquare(width, 'wefwegvwfgwef11');
    expect(squareArray[width - 1].value).toBe('wefwegvwfgwef11');
  });

  it('should get Empty Random Array Index', () => {
    let width = 4;
    let squareArray = generateLinkedWordsSquare(width, 'f');
    let index = getEmptyRandomArrayIndex(squareArray, {
      width,
      xPosition: 0,
      yPosition: 0,
    });

    expect(index).toBe(-1);

    squareArray = generateLinkedWordsSquare(width);
    index = getEmptyRandomArrayIndex(squareArray, {
      width,
      xPosition: 0,
      yPosition: 0,
    });
    expect(index).toBeGreaterThan(-1);
  });
});
