import { createDomain, sample } from "effector";
import { createGate } from "effector-react";
import { clearError, setError } from "../../../core/errors";
import {
  clearToken,
  saveRefreshToken,
  saveToken,
} from "../../../http/AuthService/model";
import { getMyProfile } from "../../User/model/store";
import { loginFetch, loginVkFetch } from "./api";
import { ILoginForm, ILoginResponce, TTokens, TVkCode } from "./types";

export const AuthDomain = createDomain("AuthDomain");

export const clearTokenStore = AuthDomain.event();

export const login = AuthDomain.event<ILoginForm>();

const loginFx = AuthDomain.effect<ILoginForm, boolean, Error>({
  handler: loginFetch,
});

sample({
  source: login,
  clock: login,
  fn: (lg: ILoginForm) => {
    clearError();
    return lg;
  },
  target: loginFx,
});

loginFx.fail.watch((error: any) => setError(error));

const loginVkFx = AuthDomain.effect<TVkCode, TVkCode, Error>({
  handler: loginVkFetch,
});

export const LoginGate = createGate<{ code: string }>("LoginGate");

LoginGate.open.watch(() => {
  clearError();
});

LoginGate.state.updates.watch((code) => {
  code.code && loginVkFx(code);
});

export const login$ = AuthDomain.store<ILoginResponce | null>(null)
  .on(loginFx.done, (_, { result }: { result: any }) => {
    auth({ ...result });
    return result;
  })
  .on(loginVkFx.done, (_, { result }: { result: any }) => {
    auth({ ...result });
    return result;
  })
  .on(loginFx.fail, clearToken)
  .reset(clearTokenStore);

const auth = (tokens: TTokens) => {
  clearToken();
  saveToken(tokens.accessToken);
  saveRefreshToken(tokens.refreshToken);
  getMyProfile();
};

login$.updates.watch((v) => console.log("LoginStoreWatch", v));
