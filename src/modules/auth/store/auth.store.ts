import { defineStore } from 'pinia';
import type { IAuthForm, IAuthLoginResponse, IAuthStore } from '@/modules/auth/model/auth.model';
import http from '@/plugins/axios';
import { AuthApi } from '../constants/authApi.constant';

export const useAuthStore = defineStore('auth', {
  state: (): IAuthStore => ({
    auth_isAuthenticated: false,
    auth_token: null,
    auth_userInfo: null,
    auth_loading: false,
  }),

  getters: {
    // Only if getter name not same as state name
  },

  actions: {
    async auth_doLogin(payload: IAuthForm): Promise<IAuthLoginResponse> {
      try {
        this.auth_loading = true;

        const { data } = await http.post<IAuthLoginResponse>(AuthApi.Login, payload);
        this.$patch({
          auth_isAuthenticated: true,
          auth_token: data.token,
          auth_userInfo: data,
        });
        return Promise.resolve(data);
      } catch (err) {
        return Promise.reject(err);
      } finally {
        this.auth_loading = false;
      }
    },
    auth_doLogout(): void {
      this.$reset();
    },
  },

  // For activated persist state, you can add the code below:
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        key: 'auth',
        paths: ['auth_isAuthenticated', 'auth_token', 'auth_userInfo'],
      },
    ],
  },
});
