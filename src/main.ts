import { createApp } from 'vue';
import App from './App.vue';

// Bus
import { Emitter } from 'mitt';

import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import pinia from './core/store';
import loadRouter from './core/router';
import loadLocale from './plugins/i18n';

import RegisterBaseComponent from './core/components';
import RegisterPrimeVueComponents from './plugins/primevue';

import bus from './plugins/bus';

const initApp = async () => {
  const app = createApp(App);

  app.use(PrimeVue, {});
  RegisterPrimeVueComponents(app);

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
