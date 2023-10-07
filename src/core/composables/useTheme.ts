import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../store/theme.store';

export const useTheme = () => {
  const themeStore = useThemeStore();
  const { theme_appTheme } = storeToRefs(themeStore);

  const theme_isDark = computed(() => theme_appTheme.value === 'dark');

  return {
    theme_appTheme,
    theme_isDark,
  };
};
