import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import { wordsSquare$, WordsSquareGate } from "./model/store";
import { TPositionValue } from "./model/types";

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
    <div>
      {/* {JSON.stringify(rowArray)} */}
      <div>
        <div className="status">{JSON.stringify(wordsStore)}</div>

        <div className="board-row">
          <Square value={"a"} />
          <Square value={"a"} />
          <Square value={"a"} />
        </div>
        <div className="board-row">
          <Square value={"a"} />
          <Square value={"a"} />
          <Square value={"a"} />
        </div>
        <div className="board-row">
          <Square value={"a"} />
          <Square value={"a"} />
          <Square value={"a"} />
        </div>
      </div>
    </div>
  );
}
