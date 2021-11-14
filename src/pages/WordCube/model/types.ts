import { TDiceValue } from "../../../core/types";

export type TDices = {
  dice1: TDiceValue;
  dice2: TDiceValue;

  isShown: boolean;
  rolling: boolean;
  dicesSum: number;
};

export type TPosition = {
  xPosition: number;
  yPosition: number;
  width: number;
};

export type TPositionValue = {
  x: number;
  y: number;
  value: string | null;
};
