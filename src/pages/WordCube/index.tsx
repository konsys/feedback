import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import { wordsSquare$, WordsSquareGate } from "./model/store";
import { TPositionValue } from "./model/types";

const SQUARE_WIDTH = 70;
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

  console.log(generateSquare(wordsStore));
  return (
    <div
      style={{
        position: "relative",
        width: `${SQUARE_WIDTH * 4}px`,
        height: `${SQUARE_WIDTH * 4}px`,
      }}
    >
      {wordsStore.map((position) => (
        <Square position={position} squareWidth={SQUARE_WIDTH} />
      ))}
    </div>
  );
}
