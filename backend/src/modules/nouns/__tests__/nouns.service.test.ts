import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NounsEntity } from 'src/entities/nouns.entity';
import { Repository } from 'typeorm';
import { NounsService } from '../nouns.service';
import {
  generateLinkedWordsSquare,
  getAvailableDirections,
  getEmptyRandomArrayIndex,
  getRandomDirection,
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

  it('should test generating square', () => {
    const width = 3;
    const squareArray = generateLinkedWordsSquare(width);
    expect(squareArray.length).toBe(width * width);

    let x = 0;
    let y = 0;
    for (let element of squareArray) {
      expect(element).toStrictEqual({ value: null, x, y });
      if (x === width - 1) {
        x = 0;
        y++;
      } else {
        x++;
      }
    }

    let randomIndex = getEmptyRandomArrayIndex(squareArray);

    expect(randomIndex).not.toBeGreaterThan(width * width);

    const el = squareArray[0];

    const word = 'sport';

    squareArray[randomIndex] = {
      ...squareArray[randomIndex],
      value: word[0],
    };

    let availableDirections = getAvailableDirections({
      width,
      xPosition: el.x,
      yPosition: el.y,
    });

    let nextSquare = getRandomDirection(availableDirections);

    // expect(nextSquare).toBe(1);

    for (let i = 1; i < word.length; i++) {
      availableDirections = getAvailableDirections({
        width,
        xPosition: nextSquare.x,
        yPosition: nextSquare.y,
      });
      nextSquare = getRandomDirection(availableDirections);
      randomIndex = getEmptyRandomArrayIndex(squareArray);
      squareArray[randomIndex] = {
        ...squareArray[randomIndex],
        value: word[i],
      };
    }

    // expect(squareArray).toBe(width * width);
  });
});
