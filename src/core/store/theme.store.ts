import { defineStore } from 'pinia';

export function updateTheme(theme: 'dark' | 'light' = 'light') {
  const element = document.querySelector('html');

  if (theme === 'dark')
    element?.classList.add('dark-mode');
  else element?.classList.remove('dark-mode');
}

export const useThemeStore = defineStore('theme', {
  state: (): IAppTheme => ({
    theme_appTheme: 'light',
  }),

  actions: {
    theme_changeTheme() {
      this.theme_appTheme = this.theme_appTheme === 'light' ? 'dark' : 'light';
      updateTheme(this.theme_appTheme);
    },
  },

  persist: true,
});
