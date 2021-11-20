import { BadRequestException } from '@nestjs/common';
import { TPosition, TPositionValue } from './nouns.service';

const MAX_WIDTH = 10;

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
    return -1;
  }

  const randIndex = getRandomArbitrary(0, availvableIndexes.length - 1);
  return availvableIndexes[randIndex];
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
