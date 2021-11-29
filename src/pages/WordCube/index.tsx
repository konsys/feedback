import { InputNumber } from "antd";
import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import debounce from "lodash/debounce";
import {
  wordsSquare$,
  WordsSquareGate,
  changeSideSize,
  squareSize$,
} from "./model/store";

const LETTER_SQUARE_WIDTH = 70;

export default function WordCube() {
  useGate(WordsSquareGate);
  const wordsStore = useStore(wordsSquare$);
  const size = useStore(squareSize$);

  return (
    <>
      <InputNumber
        placeholder="Введите сторону квадрата"
        onChange={debounce((v) => changeSideSize(v), 500)}
      />
      <div
        style={{
          position: "relative",
          width: `${LETTER_SQUARE_WIDTH * size}px`,
          height: `${LETTER_SQUARE_WIDTH * size}px`,
          border: " 2px solid green",
        }}
      >
        {wordsStore.map((position, k) => (
          <Square
            key={k}
            position={position}
            squareWidth={LETTER_SQUARE_WIDTH}
          />
        ))}
      </div>
    </>
  );
}
