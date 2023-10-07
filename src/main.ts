import { createApp } from 'vue';
import App from './App.vue';

// Bus
import { Emitter } from 'mitt';

import PrimeVue from 'primevue/config';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import i18n from './plugins/i18n';
import pinia from './core/store';
import router from './core/router';

import RegisterBaseComponent from './core/components';
import RegisterPrimeVueComponents from './plugins/primevue';

import bus from './plugins/bus';

const app = createApp(App);

app.use(PrimeVue, {});
RegisterPrimeVueComponents(app);

app.use(i18n);
app.use(pinia);
app.use(router);

RegisterBaseComponent(app);

app.provide<Emitter<TBusEvent>>('bus', bus);

app.mount('#app');
