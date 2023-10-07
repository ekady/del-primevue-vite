import type { App } from 'vue';
import {
  BaseImage,
  BaseLabel,
  BaseBreadcrumb,
  BaseDropdown,
  BaseCardFilter,
  BaseTableFooter,
  BaseTableHeader,
  BaseTableAction,
} from './base';
import { CommonEntryPoint, CommonNotFound } from '@/core/components/common';
import { FormGroup } from '@/core/components/form';
import { LayoutEmpty, LayoutAuth, LayoutDefault } from '@/core/components/layouts';

/**
 * Global register component
 * @params app
 */
const RegisterBaseComponent = (app: App) => {
  // Base
  app.component('BaseImage', BaseImage);
  app.component('BaseLabel', BaseLabel);
  app.component('BaseBreadcrumb', BaseBreadcrumb);
  app.component('BaseDropdown', BaseDropdown);
  app.component('BaseCardFilter', BaseCardFilter);

  // Base Table
  app.component('BaseTableFooter', BaseTableFooter);
  app.component('BaseTableHeader', BaseTableHeader);
  app.component('BaseTableAction', BaseTableAction);

  // FormGroup
  app.component('FormGroup', FormGroup);

  // Layout
  app.component('EmptyLayout', LayoutEmpty);
  app.component('AuthLayout', LayoutAuth);
  app.component('DefaultLayout', LayoutDefault);

  // Common
  app.component('CommonNotFound', CommonNotFound);
  app.component('CommonEntryPoint', CommonEntryPoint);
};

export default RegisterBaseComponent;
