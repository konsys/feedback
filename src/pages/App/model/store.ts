import { createApi, createStore } from "effector";

export const appStore$ = createStore<number>(0);

export const appApi = createApi(appStore$, {
  increment: (state) => state + 1,
  decrement: (state) => state - 1,
});
