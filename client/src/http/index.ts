import axios, { AxiosRequestConfig } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse.model';

export const API_URL = 'http://localhost:5001/api/';

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config: AxiosRequestConfig<any>) => {
  const accessToken: string | null = localStorage.getItem('token');

  if (accessToken) {
    // TODO: fix
    // there is no Accept header in request after response interceptor which causes errors
    const headers = {
      ...config!.headers,
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${accessToken}`,
    };
    config!.headers = headers;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('[Unauthorized] error)', error);
      }
    }

    return Promise.reject(error);
  }
);

export default $api;
