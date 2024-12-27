import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import { CommonEntryPoint, CommonNotFound } from '@/core/components/common';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import bus from '@/plugins/bus';

async function loadRouter() {
  const routes: Array<RouteRecordRaw> = [];
  const modules = import.meta.glob('/**/*.route.ts');

  for (const path in modules) {
    const module: any = await modules[path]();
    routes.push(...module.default);
  }

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // Entry Point
      {
        path: '/',
        component: CommonEntryPoint,
      },

      // Auto register routes
      ...routes,

      // Not Found
      {
        path: '/:catchAll(.*)',
        component: CommonNotFound,
      },
    ],
  });

  router.beforeEach((to, from) => {
    if (to.path !== from.path)
      bus.emit('loading_app', true);

    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.auth_isAuthenticated)
      return { name: 'login' };
  });

  router.afterEach((to, from) => {
    if (to.path !== from.path)
      bus.emit('loading_app', false);
  });

  return router;
}

export default loadRouter;
