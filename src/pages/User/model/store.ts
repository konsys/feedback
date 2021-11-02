import { createGate } from "effector-react";

import { combine, createDomain, merge, sample } from "effector";

import {
  fetchLogout,
  fetchMyProfile,
  fetchRefreshToken,
  fetchRegister,
  fetchUserEmail,
  fetchUserProfile,
} from "./api";
import { IRegistrationResponce, IUser, IUserRegistration } from "./types";
import {
  clearRefreshToken,
  clearToken,
  getRefreshToken,
  saveToken,
} from "../../../http/AuthService/model";
import { setError } from "../../../core/errors";

const UserDomain = createDomain("UserDomain");

export const ProfileGate = createGate();
export const getProfileFx = UserDomain.effect<number, IUser, Error>({
  handler: fetchUserProfile,
});

export const getUserByEmailFx = UserDomain.effect<string, IUser, Error>({
  handler: fetchUserEmail,
});

export const clearProfile = UserDomain.event();

export const profile$ = UserDomain.store<IUser | null>(null)
  .on(getProfileFx.done, (_, { result }) => (result ? result : null))
  .reset(clearProfile);

export const getUserFx = UserDomain.effect<void, IUser, Error>({
  handler: fetchMyProfile,
});

export const logoutFx = UserDomain.effect<string, boolean, Error>({
  handler: fetchLogout,
});

export const refreshTokenFx = UserDomain.effect<
  string,
  { accessToken: string },
  Error
>({
  handler: fetchRefreshToken,
});

refreshTokenFx.done.watch(({ result }) => {
  if (!result.accessToken) {
    clearToken();
    clearRefreshToken();
    logout();
  } else {
    saveToken(result.accessToken);
  }
});

export const getMyProfile = UserDomain.event();

export const logout = UserDomain.event();

// TODO test in getMyProfile call getUserFx
sample({
  clock: merge([ProfileGate.open, getMyProfile]),
  source: ProfileGate.state,
  fn: () => undefined,
  target: getUserFx,
});

ProfileGate.state.watch((v) => console.log("Profile gate update", v));
ProfileGate.close.watch(() => console.log("Profile gate closes"));

export const setUser = UserDomain.event<IUser | null>();

export const registerFx = UserDomain.effect<
  IUserRegistration,
  IRegistrationResponce,
  Error
>({
  handler: fetchRegister,
});

export const register$ = UserDomain.store<IRegistrationResponce | null>(
  null
).on(registerFx.done, (_, { result }) => {
  return result;
});

export const user$ = UserDomain.store<IUser | null>(null)
  .on(setUser, (_, data) => data)
  .on(getUserFx.done, (_, { result }) => result)
  .reset(logout);

getUserFx.fail.watch(({ error }) => {
  setError(error.message);
});

sample({
  clock: logout,
  source: combine({
    gate: ProfileGate.state,
    user: user$.map((v) => v),
  }),
  fn: ({ user }) => {
    const token = getRefreshToken();
    clearRefreshToken();
    clearToken();
    return token || "";
  },
  target: logoutFx,
});
