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

export interface IApi {
  loading: boolean;
  request: (
    url: string,
    method?: string,
    requestBody?: ApiRequestBody | null,
    requestHeaders?: ApiRequestHeaders,
  ) => Promise<IApiAuthData>;
  error: string | null;
  clearError: () => void;
}
