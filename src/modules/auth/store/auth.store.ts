import { defineStore } from 'pinia';

import type { IAuthStore } from '@/modules/auth/model/auth.model';

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
    auth_doLogout(): void {
      this.$reset();
    },
  },

  // For activated persist state, you can add the code below:
  persist: {
    key: 'auth',
    pick: ['auth_isAuthenticated', 'auth_token', 'auth_userInfo'],
  },
});
