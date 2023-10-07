import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/unplugin-vue-i18n/vite';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [vue(), VueI18n({})],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/core/assets/styles/main.scss";`,
      },
    },
  },
});
