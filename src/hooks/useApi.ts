import { ApiRequestBody, ApiRequestHeaders, IApi } from '@types';
import { useState, useCallback } from 'react';

export const useApi = (): IApi => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', requestBody: ApiRequestBody | null = null, requestHeaders: ApiRequestHeaders = {}) => {
      setLoading(true);

      try {
        const headers = requestHeaders;
        let body = requestBody;
        if (body) {
          body = JSON.stringify(body);
          headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(url, { method, body, headers });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Request error!');
        }

        return data;
      } catch (e) {
        setError(e.message);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
