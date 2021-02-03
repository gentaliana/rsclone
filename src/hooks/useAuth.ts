import { IAuthData } from '@types';
import { useState, useCallback, useEffect } from 'react';

const storageName = 'lvma_user_data';

export const useAuth = (): IAuthData => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken: string | null, id: string | null) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const storageData = localStorage.getItem(storageName) || 'null';
    const data = JSON.parse(storageData);

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId, isAuth: !!token };
};
