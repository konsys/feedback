import { createDomain } from "effector";
import { randomDice } from "../../../core/utils";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");
export const hideDices = DiceDomain.event();

export const rollDices = DiceDomain.event<void>();
export const setRandomDices = DiceDomain.event<void>();
export const setDices = DiceDomain.event<TDices>();

const getRandomDices = (): TDices => {
  const dice1 = randomDice();
  const dice2 = randomDice();
  const dice3 = randomDice();
  return {
    dice1,
    dice2,
    dice3,
    dicesSum: dice1 + dice2 + dice3,
  };
};

export const initDices: TDices = {
  dice1: 1,
  dice2: 1,
  dice3: 1,
  dicesSum: 3,
};

export const dices$ = DiceDomain.store<TDices>(initDices)
  .on(rollDices, (_, data) => {
    console.log(111111111);
    setTimeout(() => setDices(getRandomDices()), 2000);
    setTimeout(() => setDices(getRandomDices()), 4000);
    setTimeout(() => setDices(getRandomDices()), 6000);
  })
  .on(setDices, (_, data) => data)
  .on(setRandomDices, (_, data) => {})
  .reset(hideDices);
