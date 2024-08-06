import type { MenuItem } from 'primevue/menuitem';

export const FRONT_MENUS: Array<MenuItem> = [
  {
    label: 'menu.navigate',
    items: [
      {
        label: 'dashboard.title',
        icon: 'pi pi-th-large',
        to: '/dashboard',
        url: '/dashboard',
      },
      {
        label: 'todo.title',
        icon: 'pi pi-file-edit',
        url: '/todo',
        to: '/todo',
      },
    ],
  },
];
