import { createDomain, merge, sample } from "effector";
import { createGate } from "effector-react";
import { wordsSquareFetch } from "./api";
import { TPositionValue } from "./types";

const WordsSquareDomain = createDomain("WordsSquareDomain");

export const WORD_SQUARE_WIDTH = 3;
const getWordsSquareFx = WordsSquareDomain.effect<
  number,
  TPositionValue[],
  Error
>({
  handler: wordsSquareFetch,
});

export const WordsSquareGate = createGate();

sample({
  clock: merge([WordsSquareGate.open]),
  source: WordsSquareGate.state,
  fn: () => WORD_SQUARE_WIDTH,
  target: getWordsSquareFx,
});

export const wordsSquare$ = WordsSquareDomain.store<TPositionValue[]>([]).on(
  getWordsSquareFx.done,
  (_, { result }) => result
);
