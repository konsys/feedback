import { IRegistrationResponce, IUser, IUserRegistration } from "types/types";

import { createGate } from "effector-react";

import { combine, merge, sample } from "effector";
import {
  clearToken,
  getRefreshToken,
  saveToken,
  clearRefreshToken,
} from "../Token/TokenModel";
import { setError } from "../Error/ErrorModel";
import { myPendingRoom$, removePlayerFromRoomFx } from "../Rooms/RoomsModel";
import {
  fetchLogout,
  fetchMyProfile,
  fetchRefreshToken,
  fetchRegister,
  fetchUserEmail,
  fetchUserProfile,
} from "./api";

const UserDomain = GameDomain.domain("UserDomain");

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

getUserFx.fail.watch((v: any) => {
  setError(v);
});

sample({
  clock: logout,
  source: combine({
    gate: ProfileGate.state,
    user: user$.map((v) => v),
    room: myPendingRoom$.map((v) => v),
  }),
  fn: ({ room, user }) => {
    const token = getRefreshToken();
    clearRefreshToken();
    clearToken();
    room &&
      user &&
      removePlayerFromRoomFx({ roomId: room.roomId, userId: user.userId });
    return token || "";
  },
  target: logoutFx,
});
