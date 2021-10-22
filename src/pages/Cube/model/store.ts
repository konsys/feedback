import { createDomain } from "effector";
import { IDices } from "./types";

const DiceDomain = createDomain("DiceDomain");
export const hideDices = DiceDomain.event();

export const showDices = DiceDomain.event<IDices>();

export const initDices: IDices = {
  dice1: 1,
  dice2: 1,
  dice3: 1,
  dicesSum: 3,
};

export const dices$ = DiceDomain.store<IDices>(initDices)
  .on(showDices, (_, data) => {
    setTimeout(() => hideDices(), 2500);
    return data;
  })
  .reset(hideDices);
