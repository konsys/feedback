export enum Params {
  BASE_URL = "http://localhost:8000",
}

type VkResponseType = "code";

export type TVkConstants = {
  redirect_uri: string;
  client_id: number;
  scope: string;
  display: string;
  v: number;
  response_type: VkResponseType;
  revoke: number;
  oauthURL: string;
};

export const VkOAuthParams: TVkConstants = {
  redirect_uri: "http://127.0.0.1:3000/login",
  client_id: 7988646,
  scope: "email",
  display: "popup",
  v: 5.131,
  response_type: "code",
  revoke: 1,
  oauthURL: "http://oauth.vk.com/authorize?",
};
