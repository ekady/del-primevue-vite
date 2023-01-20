import { LAYOUT } from '@/modules/app/constant/layout.constant';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/todos',
    meta: { requiresAuth: true, menuGroup: 'TODOS', breadcrumb: 'todos.title' },
    children: [
      {
        path: '',
        name: 'todos',
        meta: {
          requiresAuth: true,
          layout: LAYOUT.DEFAULT,
          title: 'todos.title',
          menuGroup: 'TODOS',
        },
        component: () => import('../ui/TodosUI.vue'),
      },
    ],
  },
];

export default routes;
