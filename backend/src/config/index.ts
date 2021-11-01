export interface IJwtSettings {
  secret: string;
  expires: string;
  refreshExpires: number;
}

export interface IJwtPayload {
  username: string;
  sub: number;
}

export const CLIENT_ID = 7988646;
export const CLIENT_SECRET = 'rCd8cviaoYS9AV1CyA8h';

export const SERVICE_KEY =
  '4c50ac0f4c50ac0f4c50ac0fcb4c2949a944c504c50ac0f2d2d39e36f0f21c655cf43c1';
export const VK_API_VERSION = 5.131;
export const VK_TOKEN_URL = 'http://oauth.vk.com/access_token?';
export const REDIRECT_URI = 'http://127.0.0.1:3000/login';

type VkResponseType = 'code';
type TDisplayVkOauth = 'page' | 'popup' | 'mobile';

export type TVkOAuthParams = {
  client_id: number; //	Идентификатор Вашего приложения.
  redirect_uri: string;
  display?: TDisplayVkOauth; // Указывает тип отображения страницы авторизации.
  scope?: number; //Битовая маска настроек доступа приложения, которые необходимо проверить при авторизации пользователя и запросить отсутствующие.
  response_type?: VkResponseType; // Тип ответа, который Вы хотите получить. Укажите code.
  state?: string; // Произвольная строка, которая будет возвращена вместе с результатом авторизации.
};

export type TVkAccessTokenRequest = {
  client_id: number; //	Идентификатор Вашего приложения.
  client_secret: string; // Защищенный ключ Вашего приложения (указан в настройках приложения)
  redirect_uri: string;
  code: string; //Временный код, полученный после прохождения авторизации.
};

export type TVkAppParams = {
  serviceKey: string;
  tokenURL: string;
  redirect_uri: string;
  grant_type: 'client_credentials';
  display: TDisplayVkOauth;
  v: number;
  code: string;
  client_secret: string;
  client_id: number;
};

export type TVkUserGetRequest = {
  user_ids: number;
  access_token: string;
  client_id: number;
  fields: string;
  v: number;
};

export type TVkGetUserParams = {
  fields: string;
  access_token: string;
  userId: number;
};

export const jwtConstants: IJwtSettings = {
  secret: 'secretKey',
  expires: '600s', // 10 minutes
  refreshExpires: 7 * 3600 * 24, // 7 days
};

export const VkOAuthParams: TVkOAuthParams = {
  redirect_uri: REDIRECT_URI,
  display: 'popup',
  response_type: 'code',
  scope: 4,
  client_id: 7988646,
};

export const VkAppParams: TVkAppParams = {
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  code: '',
  display: 'page',
  grant_type: 'client_credentials',
  redirect_uri: REDIRECT_URI,
  serviceKey:
    '4c50ac0f4c50ac0f4c50ac0fcb4c2949a944c504c50ac0f2d2d39e36f0f21c655cf43c1',
  tokenURL: VK_TOKEN_URL,
  v: VK_API_VERSION,
};

export const getVkAccessTokenRequest = (
  code: string,
): TVkAccessTokenRequest => {
  return {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
  };
};

export const getVkGetUserRequest = ({
  access_token,
  fields,
  userId,
}: TVkGetUserParams): TVkUserGetRequest => {
  return {
    access_token,
    client_id: CLIENT_ID,
    fields,
    user_ids: userId,
    v: VK_API_VERSION,
  };
};
