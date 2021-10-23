export type TDiceValue = 1 | 2 | 3 | 4 | 5 | 6;
export type TDices = {
  dice1: TDiceValue;
  dice2: TDiceValue;

  isShown: boolean;
  rolling: boolean;
  dicesSum: number;
};
