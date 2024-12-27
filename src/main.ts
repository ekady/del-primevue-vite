import Aura from '@primevue/themes/aura';
import type { Emitter } from 'mitt';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';

import App from './App.vue';
import RegisterBaseComponent from './core/components';
import loadRouter from './core/router';
import pinia from './core/store';
import bus from './plugins/bus';
import loadLocale from './plugins/i18n';
import 'primeicons/primeicons.css';

async function initApp() {
  const app = createApp(App);

  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark-mode',
      },
    },
  });
  app.use(ToastService);
  app.use(ConfirmationService);

  app.use(pinia);

  const router = await loadRouter();
  app.use(router);

  const i18n = await loadLocale();
  app.use(i18n);

  RegisterBaseComponent(app);

  app.provide<Emitter<TBusEvent>>('bus', bus);

  app.mount('#app');
}

initApp();
