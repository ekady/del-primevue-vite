import { LAYOUT } from '@/core/constants/layout.constant';
import { BaseWrapper } from '@/core/components/base';
import type { RouteRecordRaw } from 'vue-router';
import { TODO_TABLE_NAME } from '../constants/todo.constant';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/todo',
    meta: { requiresAuth: true, menuGroup: 'TODOS', breadcrumb: 'todo.title' },
    component: BaseWrapper,
    props: { tableNames: [TODO_TABLE_NAME.todo] },
    children: [
      {
        name: 'todo',
        path: '',
        meta: {
          requiresAuth: true,
          layout: LAYOUT.DEFAULT,
          title: 'todo.title',
          menuGroup: 'TODOS',
        },
        component: () => import('../views/TodoUI.vue'),
      },
      {
        path: 'create',
        name: 'todoCreate',
        meta: {
          requiresAuth: true,
          layout: LAYOUT.DEFAULT,
          title: 'todo.create',
          breadcrumb: 'todo.create',
          menuGroup: 'TODOS',
        },
        component: () => import('../views/TodoCreateEditUI.vue'),
        props: { type: 'create' },
      },
      {
        path: ':id',
        name: 'todoDetail',
        meta: {
          requiresAuth: true,
          layout: LAYOUT.DEFAULT,
          title: 'todo.detail',
          breadcrumb: 'todo.detail',
          menuGroup: 'TODOS',
        },
        component: () => import('../views/TodoCreateEditUI.vue'),
        props: { type: 'detail' },
      },
      {
        path: ':id/edit',
        name: 'todoEdit',
        meta: {
          requiresAuth: true,
          layout: LAYOUT.DEFAULT,
          title: 'todo.edit',
          breadcrumb: 'todo.edit',
          menuGroup: 'TODOS',
        },
        component: () => import('../views/TodoCreateEditUI.vue'),
        props: { type: 'edit' },
      },
    ],
  },
];

export default routes;
