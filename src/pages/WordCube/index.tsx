import { useGate, useStore } from "effector-react";
import React from "react";
import { wordsSquare$, WordsSquareGate } from "./model/store";

export default function WordCube() {
  useGate(WordsSquareGate);
  const wordsStore = useStore(wordsSquare$);
  return <div>WordCube {JSON.stringify(wordsStore)}</div>;
}
