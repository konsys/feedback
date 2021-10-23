import { LocalStorageParams } from "./types/types";

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(LocalStorageParams.REFRESH_TOKEN);
};

export const saveRefreshToken = (token: string): void | null => {
  localStorage.setItem(LocalStorageParams.REFRESH_TOKEN, token);
};

export const clearRefreshToken = () => {
  localStorage.removeItem(LocalStorageParams.REFRESH_TOKEN);
};

export const getToken = (): string | null => {
  return localStorage.getItem(LocalStorageParams.TOKEN);
};

export const saveToken = (token: string): void | null => {
  localStorage.setItem(LocalStorageParams.TOKEN, token);
};

export const clearToken = () => {
  localStorage.removeItem(LocalStorageParams.TOKEN);
};
