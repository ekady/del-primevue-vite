import type { RouteRecordRaw } from 'vue-router';

import { BaseWrapper } from '@/core/components/base';
import { LAYOUT } from '@/core/constants/layout.constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    meta: {
      requiresAuth: false,
      layout: LAYOUT.AUTH,
    },
    component: BaseWrapper,
    redirect: '/auth/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('../views/AuthLoginUI.vue'),
      },
    ],
  },
];

export default routes;
