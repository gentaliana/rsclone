import { IAuthBody, IBotBody, ApiRequestHeaders, IGameData } from '@types';

export const HOST = 'https://rsclone-backend.herokuapp.com';
export const API_PATH = `${HOST}/api`;
export const API_AUTH_ENDPOINT = `${API_PATH}/auth`;
export const API_WORD_ENDPOINT = `${API_PATH}/words`;
export const API_USER_ENDPOINT = `${API_PATH}/user`;
export const API_GAME_ENDPOINT = `${API_PATH}/game`;

export const Api = {
  REGISTER: {
    url: `${API_AUTH_ENDPOINT}/register`,
    method: 'POST',
    body: (login: string, password: string): IAuthBody => ({ login, password }),
  },

  LOGIN: {
    url: `${API_AUTH_ENDPOINT}/login`,
    method: 'POST',
    body: (login: string, password: string): IAuthBody => ({ login, password }),
  },

  GET_WORD_INFO: {
    url: (lang: string, word: string): string => `${API_WORD_ENDPOINT}/${lang}/${word}`,
    method: 'GET',
  },

  GET_WORD_BY_LENGTH: {
    url: (lang: string, length: number | string): string => `${API_WORD_ENDPOINT}/${lang}/length/${length}`,
    method: 'GET',
  },

  BOT: {
    url: (lang: string): string => `${API_WORD_ENDPOINT}/${lang}/bot/find`,
    method: 'POST',
    body: (cells: string[], used: string[]): IBotBody => ({ cells: cells.map((cell) => cell.toLowerCase()), used }),
  },

  GET_USER_BY_ID: {
    url: (id: string): string => `${API_USER_ENDPOINT}/${id}`,
    method: 'GET',
    headers: (token: string | null): ApiRequestHeaders => ({
      authorization: `Bearer ${token}`,
    }),
  },

  GET_USER_WITH_GAMES: {
    url: (id: string): string => `${API_USER_ENDPOINT}/${id}/games`,
    method: 'GET',
    headers: (token: string | null): ApiRequestHeaders => ({
      authorization: `Bearer ${token}`,
    }),
  },

  SET_GAME: {
    url: API_GAME_ENDPOINT,
    method: 'POST',
    body: (
      userId: string,
      isBot: boolean,
      fieldSize: number,
      score: number,
      time: number,
      isWin: boolean,
    ): IGameData => ({
      userId,
      isBot,
      fieldSize,
      score,
      time,
      isWin,
    }),
  },

  GET_TOP_10_GAMES: {
    url: `${API_GAME_ENDPOINT}/top/10`,
    method: 'GET',
  },
};
