import { BadRequestException } from '@nestjs/common';
import { TPosition, TPositionValue } from './nouns.service';

const MAX_WIDTH = 10;
export const ERROR_INDEX = -1;
export function getAvailableDirections(position: TPosition): TPositionValue[] {
  if (position.xPosition === 0 && position.yPosition === 0) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition === 0
  ) {
    return [
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
    ];
  } else if (
    position.xPosition === 0 &&
    position.yPosition === position.width - 1
  ) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition === position.width - 1
  ) {
    return [
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition === 0
  ) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
    ];
  } else if (
    position.xPosition === 0 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition === position.width - 1
  ) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      { x: position.xPosition + 1, y: position.yPosition, value: null },
      { x: position.xPosition - 1, y: position.yPosition, value: null },
      { x: position.xPosition, y: position.yPosition + 1, value: null },
      { x: position.xPosition, y: position.yPosition - 1, value: null },
    ];
  }
}

export function generateLinkedWordsSquare(
  width: number,
  value?: string,
): TPositionValue[] {
  if (width > MAX_WIDTH || width < 0) {
    throw new BadRequestException(`Width > ${MAX_WIDTH} or < 0`);
  }

  let lettersField = [];

  for (let yPosition = 0; yPosition < width; yPosition++) {
    for (let xPosition = 0; xPosition < width; xPosition++) {
      lettersField.push({
        x: xPosition,
        y: yPosition,
        value: value ?? null,
      });
    }
  }
  return lettersField;
}

export function getRandomDirectionIndex(arr: TPositionValue[]): number {
  const randIndex = getRandomArbitrary(0, arr.length - 1);
  return randIndex;
}

export function getEmptyRandomArrayIndex(
  arr: TPositionValue[],
  prevPosition: TPosition,
) {
  const availableDirections = getAvailableDirections(prevPosition);

  const availvableIndexes: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];

    if (el.value === null) {
      let availableDirection = availableDirections.find(
        (v) => v.x === el.x && v.y === el.y,
      );

      if (availableDirection) {
        availvableIndexes.push(i);
      }
    }
  }

  if (!availvableIndexes.length) {
    return ERROR_INDEX;
  }

  const randIndex = getRandomArbitrary(0, availvableIndexes.length);

  return availvableIndexes[randIndex];
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function fillEmptySquares(wordsArray: TPositionValue[]) {
  const alph = 'абвгдежзиклмнопрстухчшюя';
  return wordsArray.map((v) => {
    if (v.value === null) {
      return { ...v, value: alph[getRandomArbitrary(0, alph.length - 1)] };
    }
    return v;
  });
}

export const addWordsToSquare = (
  squareArray: TPositionValue[],
  words: string[],
) => {
  const arrCopy = [...squareArray];
  const addedWords = [];

  for (let word of words) {
    let randomIndex = getRandomArbitrary(0, arrCopy.length - 1);

    const res = addWord(word, squareArray, randomIndex);
    if (res) {
      addedWords.push(word);
    }
  }

  return { wordsSquare: arrCopy, words: addedWords };
};

const addWord = (word: string, arr: TPositionValue[], randomIndex: number) => {
  const arrCopy = [...arr];
  arrCopy[randomIndex] = {
    ...arrCopy[randomIndex],
    value: word[0],
  };
  for (let i = 1; i < word.length; i++) {
    const el = arrCopy[randomIndex];

    randomIndex = getEmptyRandomArrayIndex(arrCopy, {
      width: Math.sqrt(arrCopy.length),
      xPosition: el.x,
      yPosition: el.y,
    });

    if (randomIndex === ERROR_INDEX) {
      return false;
    }

    arrCopy[randomIndex] = {
      ...arrCopy[randomIndex],
      value: word[i],
    };
  }
  return arrCopy;
};
