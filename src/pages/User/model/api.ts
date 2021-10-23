import { client } from "../../../http/Clients";
import {
  IPlayer,
  IRegistrationResponce,
  IUser,
  IUserRegistration,
} from "./types";

const usersUrl = `/users`;
const initUsersUrl = `/users/init`;
export const initUsersFetch = async ({
  ids,
  gameId,
}: {
  ids: number[];
  gameId: string;
}): Promise<IPlayer[]> =>
  (await client.get<IPlayer[]>(initUsersUrl, { params: { ids, gameId } })).data;

export const usersFetch = async (ids: number[]): Promise<IPlayer[]> => {
  return (await client.get<IPlayer[]>(usersUrl, { params: { ids } })).data;
};

const profileUrl = `/users/profile`;

export async function fetchMyProfile(): Promise<IUser> {
  return (await client.get<IUser>(profileUrl)).data;
}

export async function fetchUserProfile(id: number): Promise<IUser> {
  const url = profileUrl + "/" + id;
  return (await client.get<IUser>(url)).data;
}

export async function fetchUserEmail(email: string): Promise<IUser> {
  return (await client.get<IUser>("/users/creds", { params: { email } })).data;
}

const refreshUrl = `/users/auth/refresh`;

export async function fetchRefreshToken(
  accessToken: string
): Promise<{ accessToken: string }> {
  return (
    await client.post<{ accessToken: string }>(refreshUrl, { accessToken })
  ).data;
}

const logoutUrl = `/users/auth/logout`;

export async function fetchLogout(refreshToken: string): Promise<boolean> {
  return (await client.post<boolean>(logoutUrl, { refreshToken })).data;
}

export async function fetchRegister(
  user: IUserRegistration
): Promise<IRegistrationResponce> {
  return (await client.post<IRegistrationResponce>("/users/register", user))
    .data;
}
