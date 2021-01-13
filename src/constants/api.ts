import { IAuthBody } from '@types';

export const HOST = 'https://rsclone-backend.herokuapp.com';
export const API_PATH = `${HOST}/api`;
export const API_AUTH_ENDPOINT = `${API_PATH}/auth`;
export const API_WORD_ENDPOINT = `${API_PATH}/words`;

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
};
