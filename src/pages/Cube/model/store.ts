import { createDomain } from "effector";
import { randomDice } from "../../../core/utils";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");
export const hideDices = DiceDomain.event();
const setDices = DiceDomain.event<TDices>();

const setRandomDices = DiceDomain.event<void>();
export const stopRolling = DiceDomain.event<void>();
export const startRolling = DiceDomain.event<void>();

const getRandomDices = (dices: TDices): TDices => {
  const dice1 = randomDice();
  const dice2 = randomDice();
  return {
    ...dices,
    dice1,
    dice2,
    dicesSum: dice1 + dice2,
  };
};

export const initDices: TDices = {
  dice1: 1,
  dice2: 1,
  dicesSum: 2,
  rolling: false,
  isShown: false,
};

export const rollDicesFx = DiceDomain.effect(async () => {
  const rollMe = () => {
    hideDices();
    startRolling();
    setRandomDices();
    stopRolling();
  };

  return setTimeout(rollMe, 10);
});

rollDicesFx.done.watch(() => {
  stopRolling();
});

export const dices$ = DiceDomain.store<TDices>(initDices)

  .on(setDices, (_, data) => data)
  .on(startRolling, (data) => ({ ...data, rolling: true, isShown: true }))
  .on(stopRolling, (data) => ({ ...data, rolling: false }))
  .on(setRandomDices, (data) => setDices(getRandomDices(data)))

  .reset(hideDices);

dices$.watch(console.log);
