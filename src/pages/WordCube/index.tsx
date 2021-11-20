import { useGate, useStore } from "effector-react";
import React from "react";
import Square from "./components/Square";
import {
  wordsSquare$,
  WordsSquareGate,
  WORD_SQUARE_WIDTH,
} from "./model/store";

const LETTER_SQUARE_WIDTH = 70;

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
