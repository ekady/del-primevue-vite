import { FormGroup } from './core/components/form';

import {
  BaseDropdown,
  BaseBreadcrumb,
  BaseImage,
  BaseLabel,
  BaseCardFilter,
  BaseTableFooter,
  BaseTableHeader,
  BaseTableAction,
} from './core/components/base';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // Router
    RouterLink: typeof import('vue-router')['RouterLink'];
    RouterView: typeof import('vue-router')['RouterView'];

    // Form
    FormGroup: typeof FormGroup;

    // Base Components
    BaseImage: typeof BaseImage;
    BaseLabel: typeof BaseLabel;
    BaseBreadcrumb: typeof BaseBreadcrumb;
    BaseDropdown: typeof BaseDropdown;
    BaseCardFilter: typeof BaseCardFilter;

    // Base Table Components
    BaseTableFooter: typeof BaseTableFooter;
    BaseTableHeader: typeof BaseTableHeader;
    BaseTableAction: typeof BaseTableAction;
  }
}

export {};
