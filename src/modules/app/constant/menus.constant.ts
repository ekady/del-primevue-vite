import type { RouteLocationNamedRaw } from 'vue-router';

interface IMenus {
  title: string;
  icon?: string;
  route?: RouteLocationNamedRaw;
  desc?: string;
  menuGroup?: string;
}

export const FRONT_MENUS: Array<IMenus> = [
  {
    title: 'dashboard.title',
    icon: 'ri-home-6-line',
    route: { name: 'dashboard' },
    desc: 'Dashboard Page',
  },
  {
    title: 'notes.title',
    icon: 'ri-booklet-line',
    route: { name: 'notes' },
    desc: 'Notes Page',
    menuGroup: 'NOTES',
  },
];
