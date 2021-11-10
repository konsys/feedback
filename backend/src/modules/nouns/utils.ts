import { BadRequestException } from '@nestjs/common';
import { TPosition, TPositionValue } from './nouns.service';

const MAX_WIDTH = 10;

export function getAvailableDirections(position: TPosition) {
  if (position.xPosition === 0 && position.yPosition === 0) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition === 0
  ) {
    return [
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
    ];
  } else if (
    position.xPosition === 0 &&
    position.yPosition === position.width - 1
  ) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition === position.width - 1
  ) {
    return [
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition === 0
  ) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
    ];
  } else if (
    position.xPosition === 0 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition === position.width - 1
  ) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  } else if (
    position.xPosition === position.width - 1 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  } else if (
    position.xPosition > 0 &&
    position.xPosition < position.width - 1 &&
    position.yPosition > 0 &&
    position.yPosition < position.width - 1
  ) {
    return [
      `${position.xPosition + 1}-${position.yPosition}`,
      `${position.xPosition - 1}-${position.yPosition}`,
      `${position.xPosition}-${position.yPosition + 1}`,
      `${position.xPosition}-${position.yPosition - 1}`,
    ];
  }
}

export function generateLinkedWordsSquare(width: number): TPositionValue[] {
  if (width > MAX_WIDTH || width < 0) {
    throw new BadRequestException(`Width > ${MAX_WIDTH} or < 0`);
  }

  let lettersField = [];

  for (let xPosition = 0; xPosition < width; xPosition++) {
    for (let yPosition = 0; yPosition < width; yPosition++) {
      lettersField.push({
        value: null,
        x: xPosition,
        y: yPosition,
      });
    }
  }
  return lettersField;
}

export function getRandomArrayElement<T>(arr: T[]): T {
  const randIndex = getRandomArbitrary(0, arr.length - 1);
  return arr[randIndex];
}

export function getRandomPosition<T extends string>(arr: T[]): number[] {
  const randIndex = getRandomArbitrary(0, arr.length - 1);
  return arr[randIndex].split('-').map((v) => Number(v));
}

export function getEmptyRandomArrayIndex(arr: TPositionValue[]) {
  const emptyElements = arr.filter((v) => v.value === null);
  const randIndex = getRandomArbitrary(0, emptyElements.length - 1);
  const el = emptyElements[randIndex];
  const index = arr.findIndex((v) => v.x === el.x && v.y === el.y);
  return index;
}

export function getRandomProperty(obj: object) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
}

export function randBinary() {
  return Math.round(Math.random());
}

export function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}
