import { notification } from "antd";
import { createDomain, guard } from "effector";
import { rollDicesFetch } from "./api";
import { TDices } from "./types";

const DiceDomain = createDomain("DiceDomain");

const setDices = DiceDomain.event<TDices>();

export const stopRolling = DiceDomain.event<void>();
export const startRolling = DiceDomain.event<void>();
export const rollDices = DiceDomain.event<void>();
export const hideDices = DiceDomain.event();

export const initDices: TDices = {
  dice1: 0,
  dice2: 0,
  dicesSum: 0,
  rolling: false,
  isShown: false,
};

const rollDicesFx = DiceDomain.effect<void, TDices, Error>({
  handler: rollDicesFetch,
});

rollDicesFx.pending.watch(() => {
  startRolling();
});

rollDicesFx.done.watch(({ result }) => {
  setDices(result);
  setTimeout(stopRolling, 800);
});

rollDicesFx.fail.watch(() => {
  setTimeout(stopRolling, 0);
  // TODO error type and message
  notification.error({ message: "Ошибка сети" });
});

const isIdle = rollDicesFx.pending.map((pending) => !pending);

guard({
  clock: rollDices,
  filter: isIdle,
  target: rollDicesFx,
});

export const dices$ = DiceDomain.store<TDices>(initDices)
  .on(setDices, (_, data) => data)
  .on(startRolling, (data) => ({ ...data, rolling: true }))
  .on(stopRolling, (data) => ({ ...data, rolling: false }))
  .reset(hideDices);
