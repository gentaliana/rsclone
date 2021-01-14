export interface IAuthBody {
  login: string;
  password: string;
}

export interface IAuthData {
  login: (jwtToken: string | null, id: string | null) => void;
  logout: () => void;
  token: string | null;
  userId: string | null;
  isAuth: boolean;
}

export interface IHttpHeaders {
  [key: string]: string;
}

export type ApiRequestBody = IAuthBody | string;

export type ApiRequestHeaders = IHttpHeaders;

export interface IApiAuthData {
  message: string;
  token: string;
  userId: string;
}

export interface IApiWordData {
  message: string;
  word: string;
  definition: string;
  lang: string;
  length: string;
}

export interface IApiData {
  [key: string]: string;
}

export interface IApi {
  loading: boolean;
  request: (
    url: string,
    method?: string,
    requestBody?: ApiRequestBody | null,
    requestHeaders?: ApiRequestHeaders,
  ) => Promise<IApiData>;
  error: string | null;
  clearError: () => void;
}
