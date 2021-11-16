import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import {
  wordsSquare$,
  WordsSquareGate,
  WORD_SQUARE_WIDTH,
} from "./model/store";
import { TPositionValue } from "./model/types";

const LETTER_SQUARE_WIDTH = 70;
const generateSquare = (wordsStore: TPositionValue[]) => {
  let x = 0;
  let row: string[] = [];
  let rowArray: string[][] = [];

  wordsStore.forEach((v, k) => {
    if (x === v.x) {
      row.push(v.value ?? "");
    } else {
      rowArray.push(row ?? "");
      x++;
      row = [];
      row.push(v.value ?? "");
    }
  });
  rowArray.push(row);
  return rowArray;
};

export default function WordCube() {
  useGate(WordsSquareGate);
  const wordsStore = useStore(wordsSquare$);

  return (
    <>
      <div>{JSON.stringify(wordsStore)}</div>
      <div
        style={{
          position: "relative",
          width: `${LETTER_SQUARE_WIDTH * WORD_SQUARE_WIDTH}px`,
          height: `${LETTER_SQUARE_WIDTH * WORD_SQUARE_WIDTH}px`,
        }}
      >
        {wordsStore.map((position) => (
          <Square position={position} squareWidth={LETTER_SQUARE_WIDTH} />
        ))}
      </div>
    </>
  );
}
