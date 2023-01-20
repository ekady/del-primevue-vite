import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosError } from 'axios';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.headers === undefined) {
    config.headers = {};
  }
  return config;
});

http.interceptors.response.use(undefined, (error: AxiosError<{ message?: string }>) => {
  return Promise.reject(error);
});

export default http;
