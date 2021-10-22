import { TDiceValue } from "../../../core/types";

export type TDices = {
  dice1: TDiceValue;
  dice2: TDiceValue;

  isShown: boolean;
  rolling: boolean;
  dicesSum: number;
};
