import { createApp } from 'vue';
import App from './App.vue';

// Bus
import { Emitter } from 'mitt';

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css';
import Aura from '@primevue/themes/aura';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import pinia from './core/store';
import loadRouter from './core/router';
import loadLocale from './plugins/i18n';

import RegisterBaseComponent from './core/components';

import bus from './plugins/bus';

const initApp = async () => {
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
};

initApp();
