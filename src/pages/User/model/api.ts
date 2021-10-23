import {
  IPlayer,
  IRegistrationResponce,
  IUser,
  IUserRegistration,
} from "../../types/types";

import { client } from "../../http/client";

const usersUrl = `/users`;
const initUsersUrl = `/users/init`;
export const initUsersFetch = async ({
  ids,
  gameId,
}: {
  ids: number[];
  gameId: string;
}): Promise<IPlayer[]> =>
  await (
    await client.get(initUsersUrl, { params: { ids, gameId } })
  ).data;

export const usersFetch = async (ids: number[]): Promise<IPlayer[]> => {
  return await (
    await client.get(usersUrl, { params: { ids } })
  ).data;
};

const profileUrl = `/users/profile`;

export async function fetchMyProfile(): Promise<IUser> {
  const user = await client.get(profileUrl);
  return user ? await user.data : undefined;
}

export async function fetchUserProfile(id: number): Promise<IUser> {
  const url = profileUrl + "/" + id;
  const user = await client.get(url);
  return user ? await user.data : undefined;
}

export async function fetchUserEmail(email: string): Promise<IUser> {
  const user = await client.get("/users/creds", { params: { email } });
  return user ? await user.data : undefined;
}

const refreshUrl = `/users/auth/refresh`;

export async function fetchRefreshToken(
  accessToken: string
): Promise<{ accessToken: string }> {
  return await (
    await client.post(refreshUrl, { accessToken })
  ).data;
}

const logoutUrl = `/users/auth/logout`;

export async function fetchLogout(refreshToken: string): Promise<boolean> {
  return await (
    await client.post(logoutUrl, { refreshToken })
  ).data.result;
}

export async function fetchRegister(
  user: IUserRegistration
): Promise<IRegistrationResponce> {
  return await (
    await client.post("/users/register", user)
  ).data;
}
