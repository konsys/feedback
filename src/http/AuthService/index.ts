import { AxiosRequestConfig } from "axios";
import { IUser, LoginRequest } from "../../pages/User/model/types";
import { client } from "../Clients";
import { Paths } from "../Clients/paths";

export const authTokenName = "Authorization";

enum LocalStorageKeys {
  accessToken = "auth.token",
  accessTokenExpiresIn = "auth.token.expires",
  refreshToken = "refresh.token",
  refreshTokenExpiresIn = "refresh.token.expires",
  keepTokens = "auth.token.store",
}

interface AuthResponse {
  token: string;
  tokenExpireIn: string;
  refreshToken: string;
  refreshTokenExpiresIn: string | null;
  profile: IUser;
}

export class Auth {
  public static initialize(): Promise<IUser> {
    if (!Auth.accessToken) {
      return Promise.reject(new Error());
    } else if (Auth.isAccessTokenExpired()) {
      return Auth.refreshAccessToken().then(Auth.loadUser);
    } else {
      Auth.setAuthHeader();
      return Auth.loadUser();
    }
  }

  public static async login({
    username,
    password,
    saveCredentials,
  }: LoginRequest): Promise<IUser> {
    const req = { username, password };
    const authResponse = await client.post(`${Paths.auth}/pwd`, req);
    const auth = authResponse.data as AuthResponse;
    const { profile, token } = auth;
    Auth.storeTokens(auth, saveCredentials);
    Auth.setAuthHeader(token);
    return profile;
  }

  public static logout() {
    Auth.removeTokens(localStorage);
    Auth.removeTokens(sessionStorage);
    Auth.cleanAuthHeaders();
  }

  public static async loadUser(): Promise<IUser> {
    return await client.get(Paths.user);
  }

  public static async refreshAccessToken(): Promise<string> {
    const req = { refreshToken: Auth.refreshToken };
    const config: AxiosRequestConfig = { headers: { Authorization: "" } };

    try {
      const response = await client.post(
        Paths.auth.concat("/token"),
        req,
        config
      );
      const auth = response.data as AuthResponse;
      Auth.storeTokens(auth);
      Auth.setAuthHeader();
      console.debug("Access token has been refreshed");
      return auth.token;
    } catch (err) {
      console.debug("Unable to refresh access token ", err);
      return Promise.reject(err);
    }
  }

  private static storeTokens(
    auth: AuthResponse,
    saveCredentials = Auth.keepTokens
  ) {
    const { token, tokenExpireIn, refreshToken, refreshTokenExpiresIn } = auth;
    const storage = saveCredentials ? localStorage : sessionStorage;

    localStorage.setItem(LocalStorageKeys.keepTokens, String(saveCredentials));

    if (token) {
      storage.setItem(LocalStorageKeys.accessToken, token);
    }

    if (tokenExpireIn) {
      storage.setItem(LocalStorageKeys.accessTokenExpiresIn, tokenExpireIn);
    }

    if (refreshToken) {
      storage.setItem(LocalStorageKeys.refreshToken, refreshToken);
    }

    if (refreshTokenExpiresIn) {
      storage.setItem(
        LocalStorageKeys.refreshTokenExpiresIn,
        refreshTokenExpiresIn
      );
    }

    if (!saveCredentials) {
      this.removeTokens(localStorage);
    }
  }

  public static get accessToken(): string | null {
    const storage = Auth.keepTokens ? localStorage : sessionStorage;
    return storage.getItem(LocalStorageKeys.accessToken);
  }

  private static get refreshToken(): string | null {
    const storage = Auth.keepTokens ? localStorage : sessionStorage;
    return storage.getItem(LocalStorageKeys.refreshToken);
  }

  private static get accessTokenExpiresIn(): string | null {
    const storage = Auth.keepTokens ? localStorage : sessionStorage;
    return storage.getItem(LocalStorageKeys.accessTokenExpiresIn);
  }

  // @ts-ignore
  private static get refreshTokenExpiresIn(): string | null {
    const storage = Auth.keepTokens ? localStorage : sessionStorage;
    return storage.getItem(LocalStorageKeys.refreshTokenExpiresIn);
  }

  private static get keepTokens(): boolean {
    const value = localStorage.getItem(LocalStorageKeys.keepTokens);
    return value === "true";
  }

  private static removeTokens(storage: Storage) {
    storage.removeItem(LocalStorageKeys.accessToken);
    storage.removeItem(LocalStorageKeys.refreshToken);
    storage.removeItem(LocalStorageKeys.accessTokenExpiresIn);
    storage.removeItem(LocalStorageKeys.refreshTokenExpiresIn);
  }

  private static setAuthHeader(token = Auth.accessToken) {
    if (token != null) {
      // TODO add type
      // client.defaults.headers[authTokenName] = `Bearer ${token}`;
    }
  }

  public static cleanAuthHeaders() {
    // client.defaults.headers[authTokenName] = undefined;
  }

  private static isAccessTokenExpired(): boolean {
    const expiration = Auth.accessTokenExpiresIn;
    const threshold = 60;
    return expiration
      ? new Date(expiration).getTime() - threshold * 1000 < new Date().getTime()
      : true;
  }
}
