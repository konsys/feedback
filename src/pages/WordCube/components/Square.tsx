import React, { ReactElement } from "react";
import { TPositionValue } from "../model/types";

interface Props {
  position: TPositionValue;
  squareWidth: number;
}

export default function Square({ position, squareWidth }: Props): ReactElement {
  const { x, y, value } = position;
  return (
    <div
      style={{
        position: "absolute",
        bottom: y * squareWidth,
        left: x * squareWidth,
        border: "1px solid red",
        width: `${squareWidth}px`,
        height: `${squareWidth}px`,
      }}
    >
      <div
        className="square"
        onClick={function () {
          alert(value);
        }}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        {value?.toLocaleLowerCase()}
      </div>
    </div>
  );
}
