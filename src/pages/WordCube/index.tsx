import { Input } from "antd";
import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import debounce from "lodash/debounce";
import {
  wordsSquare$,
  WordsSquareGate,
  WORD_SQUARE_WIDTH,
  changeSideSize,
} from "./model/store";

const LETTER_SQUARE_WIDTH = 70;

export default function WordCube() {
  useGate(WordsSquareGate);
  const wordsStore = useStore(wordsSquare$);

  return (
    <>
      <Input
        placeholder="Введите сторону квадрата"
        onChange={debounce((v) => changeSideSize(v.target.value), 500)}
      />
      <div
        style={{
          position: "relative",
          width: `${LETTER_SQUARE_WIDTH * WORD_SQUARE_WIDTH}px`,
          height: `${LETTER_SQUARE_WIDTH * WORD_SQUARE_WIDTH}px`,
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
