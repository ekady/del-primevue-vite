export {};

import 'vue-router';

// Constant
import type { LAYOUT } from '@/core/constants/layout.constant';

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
