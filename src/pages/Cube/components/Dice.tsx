import React from "react";
import { FiveDice } from "./FiveDice";
import { FourDice } from "./FourDice";
import { OneDice } from "./OneDice";
import { SixDice } from "./SixDice";
import { ThreeDice } from "./ThreeDice";
import { TwoDice } from "./TwoDice";

export const Dice = React.forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div className=" diceBody" ref={ref}>
      <OneDice />
      <TwoDice />
      <ThreeDice />
      <FourDice />
      <FiveDice />
      <SixDice />
    </div>
  );
});
