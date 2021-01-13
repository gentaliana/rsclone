import { IAuthBody } from '@types';

export const HOST = 'https://rsclone-backend.herokuapp.com';
export const API_PATH = `${HOST}/api`;
export const API_AUTH_ENDPOINT = `${API_PATH}/auth`;

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
};
