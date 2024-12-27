// Constant
import type { LAYOUT } from '@/core/constants/layout.constant';

import 'vue-router';

export {};

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    layout?: LAYOUT;
    title?: string;
    breadcrumb?: string;
    breadcrumbDisabled?: boolean;
    menuGroup?: string;
  }
}
