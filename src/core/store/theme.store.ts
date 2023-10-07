import { defineStore } from 'pinia';

export function updateTheme(theme: 'dark' | 'light' = 'light') {
  const newValue = `/themes/lara-${theme}-blue/theme.css`;
  const relElements = Array.prototype.slice.call(document.getElementsByTagName('link'));
  relElements.forEach((element: HTMLElement) => {
    if (element.getAttribute('href')?.includes('/themes/')) element.setAttribute('href', newValue);
  });
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
