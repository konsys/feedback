import { createDomain } from "effector";
import { randomDice } from "../../../core/utils";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");
export const hideDices = DiceDomain.event();
const setDices = DiceDomain.event<TDices>();

const getRandomDices = (): TDices => {
  const dice1 = randomDice();
  const dice2 = randomDice();
  const dice3 = randomDice();
  return {
    dice1,
    dice2,
    dice3,
    roll: false,
    dicesSum: dice1 + dice2 + dice3,
  };
};

export const initDices: TDices = {
  dice1: 1,
  dice2: 1,
  dice3: 1,
  dicesSum: 3,
  roll: false,
};

export const rollDicesFx = DiceDomain.effect(async () => {
  setDices({ ...dices$.getState(), roll: true });
  return new Promise((resolve) => setTimeout(resolve));
});

rollDicesFx.done.watch(() => {
  setDices(getRandomDices());
});

export const dices$ = DiceDomain.store<TDices>(initDices)

  .on(setDices, (_, data) => data)
  .reset(hideDices);

dices$.watch(console.log);
