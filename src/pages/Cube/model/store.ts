import { createDomain } from "effector";
import { rollDices } from "./api";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");

const setDices = DiceDomain.event<TDices>();

export const stopRolling = DiceDomain.event<void>();
export const startRolling = DiceDomain.event<void>();
export const hideDices = DiceDomain.event();

export const initDices: TDices = {
  dice1: 1,
  dice2: 1,
  dicesSum: 2,
  rolling: false,
  isShown: true,
};

export const rollDicesFx = DiceDomain.effect<void, TDices, Error>({
  handler: rollDices,
});

rollDicesFx.done.watch(({ result }) => {
  console.log(111111111111, result);
  // result = result.dices;
  setDices(result);
});

export const dices$ = DiceDomain.store<TDices>(initDices)

  .on(setDices, (_, data) => data)
  .on(startRolling, (data) => ({ ...data, rolling: true, isShown: true }))
  .on(stopRolling, (data) => ({ ...data, rolling: false }))
  .on(hideDices, (data) => ({ ...data, isShown: false }));
