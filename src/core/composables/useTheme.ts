import { storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useThemeStore } from '../store/theme.store';

export function useTheme() {
  const themeStore = useThemeStore();
  const { theme_appTheme } = storeToRefs(themeStore);

  const theme_isDark = computed(() => theme_appTheme.value === 'dark');

  return {
    theme_appTheme,
    theme_isDark,
  };
}
