import axios, { type InternalAxiosRequestConfig, type AxiosInstance, type AxiosError } from 'axios';

import bus from '@/plugins/bus';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

http.interceptors.response.use(undefined, (error: AxiosError<{ message?: string }>) => {
  if (error.message !== 'canceled') {
    bus.emit('toast', { severity: 'error', closable: true, detail: error.message ?? 'Something went wrong' });
  }
  return Promise.reject(error);
});

export default http;
