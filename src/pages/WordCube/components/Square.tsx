import React, { ReactElement } from "react";

interface Props {
  value: string;
}

export default function Square({ value }: Props): ReactElement {
  return (
    <button
      className="square"
      onClick={function () {
        alert("click");
      }}
    >
      {value}
    </button>
  );
}
