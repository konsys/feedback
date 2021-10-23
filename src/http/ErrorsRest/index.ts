import { AxiosResponse } from "axios";

export enum RestErrorCodes {
  notAuthenticated = "authentication.failed",
  accessTokenExpired = "authentication.failed.expired.token",
}

export interface RestError extends Error {
  code?: string;
  timestamp?: string;
  path?: string;
  status: number;
  error?: string;
}

export async function restError(err: any): Promise<RestError> {
  if (err.response) {
    const { data, status } = err.response as AxiosResponse<RestError>;
    let json: any = data;

    if (data instanceof Blob) {
      json = (await new Promise((resolve) => {
        const fr = new FileReader();
        fr.addEventListener("load", () =>
          resolve(JSON.parse(fr.result as string))
        );
        fr.readAsText(data);
      })) as RestError;
    }
    const message = json.message || "";
    const error: any = new Error(message) as RestError;
    error.name = "RestError";
    error.status = status;

    Object.keys(json)
      .filter((prop) => prop !== "message")
      .forEach((prop) => (error[prop] = json[prop]));

    return error;
  } else {
    return err;
  }
}
