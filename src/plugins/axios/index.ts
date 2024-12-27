import axios, { type AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios';

import bus from '@/plugins/bus';

import loadLocale from '../i18n';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config;
});

http.interceptors.response.use(undefined, async (error: AxiosError<{ message?: string }>) => {
  const { global } = await loadLocale();
  if (error.message !== 'canceled') {
    bus.emit('toast', {
      severity: 'error',
      closable: true,
      summary: global.t('common.error'),
      detail: error.message ?? global.t('common.message.something_error'),
    });
  }
  return Promise.reject(error);
});

export default http;
