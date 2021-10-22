import { TDiceValue } from "../../../core/types";

export type TDices = {
  dice1: TDiceValue;
  dice2: TDiceValue;
  dice3: TDiceValue;

  roll: boolean;
  dicesSum: number;
};
