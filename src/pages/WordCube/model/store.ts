import { createDomain, sample } from "effector";
import { createGate } from "effector-react";
import { wordsSquareFetch } from "./api";
import { TPositionValue } from "./types";

const WordsSquareDomain = createDomain("WordsSquareDomain");

export const WORD_SQUARE_WIDTH = 4;

export const changeSideSize = WordsSquareDomain.event<number>();
export const squareSize$ = WordsSquareDomain.store<number>(
  WORD_SQUARE_WIDTH
).on(changeSideSize, (_, size) => Number(size));

const getWordsSquareFx = WordsSquareDomain.effect<
  number,
  TPositionValue[],
  Error
>({
  handler: wordsSquareFetch,
});

export const WordsSquareGate = createGate();

sample({
  clock: [WordsSquareGate.open],
  fn: () => WORD_SQUARE_WIDTH,
  target: getWordsSquareFx,
});

sample({
  clock: changeSideSize,
  source: squareSize$,
  fn: (v) => v ?? WORD_SQUARE_WIDTH,
  target: getWordsSquareFx,
});

export const wordsSquare$ = WordsSquareDomain.store<TPositionValue[]>([])
  .on(getWordsSquareFx.done, (_, { result }) => result)
  .on(getWordsSquareFx.fail, () => {
    changeSideSize(0);
  });
