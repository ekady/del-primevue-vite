import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueI18n from '@intlify/vite-plugin-vue-i18n';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueI18n()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/modules/app/assets/styles/main.scss";`,
      },
    },
  },
});
