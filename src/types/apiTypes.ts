export interface IAuthBody {
  login: string;
  password: string;
}

export interface IBotBody {
  cells: string[];
  used: string[];
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

export interface IGameData {
  userId: string;
  isBot: boolean;
  fieldSize: number;
  score: number;
  time: number;
  isWin: boolean;
}

export type ApiRequestBody = IAuthBody | IBotBody | IGameData | string;

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
