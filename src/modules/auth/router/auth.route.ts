import type { RouteRecordRaw } from 'vue-router';

import { LAYOUT } from '@/core/constants/layout.constant';
import { BaseWrapper } from '@/core/components/base';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    meta: {
      requiresAuth: false,
      layout: LAYOUT.AUTH,
    },
    component: BaseWrapper,
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
