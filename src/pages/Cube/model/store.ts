import { createDomain, sample } from "effector";
import { rollDicesFetch } from "./api";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");

const setDices = DiceDomain.event<TDices>();

export const stopRolling = DiceDomain.event<void>();
export const rollDices = DiceDomain.event<void>();
export const hideDices = DiceDomain.event();

export const initDices: TDices = {
  dice1: 1,
  dice2: 1,
  dicesSum: 2,
  rolling: false,
  isShown: true,
};

const rollDicesFx = DiceDomain.effect<void, TDices, Error>({
  handler: rollDicesFetch,
});

rollDicesFx.done.watch(({ result }) => {
  setTimeout(() => setDices(result), 100);
  setTimeout(stopRolling, 100);
});

sample({
  clock: rollDices,
  // source: $dices ,

  fn: hideDices,
  target: rollDicesFx,
});

export const dices$ = DiceDomain.store<TDices>(initDices)

  .on(setDices, (_, data) => data)
  .on(stopRolling, (data) => ({ ...data, rolling: false }))
  .on(hideDices, (data) => ({ ...data, isShown: false }));
