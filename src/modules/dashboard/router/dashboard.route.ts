import type { RouteRecordRaw } from 'vue-router';

import { LAYOUT } from '@/core/constants/layout.constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      layout: LAYOUT.DEFAULT,
      requiresAuth: true,
      title: 'dashboard.title',
      breadcrumb: 'dashboard.title',
      menuGroup: 'DASHBOARD',
    },
    component: () => import('../views/DashboardUI.vue'),
  },
];

export default routes;
