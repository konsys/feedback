import { TDiceValue } from "./types";

const random = (min: number, max: number) =>
  Math.ceil(min + Math.random() * (max - min));

export const randomDice = (): TDiceValue => random(1, 6) as TDiceValue;
