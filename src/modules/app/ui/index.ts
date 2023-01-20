import type { App } from 'vue';
import { AppBaseImage, AppBaseLabel, AppBaseBreadcrumb, AppBaseDropdown } from './components/base';
import { AppCommonEntryPoint, AppCommonNotFound } from '@/modules/app/ui/components/common';
import { FormGroup } from '@/modules/app/ui/components/form';
import { AppLayoutEmpty, AppLayoutAuth, AppLayoutDefault } from '@/modules/app/ui/components/layouts';

/**
 * Global register component
 * @params app
 */
const RegisterBaseComponent = (app: App) => {
  // Base
  app.component('AppBaseImage', AppBaseImage);
  app.component('AppBaseLabel', AppBaseLabel);
  app.component('AppBaseBreadcrumb', AppBaseBreadcrumb);
  app.component('AppBaseDropdown', AppBaseDropdown);

  // FormGroup
  app.component('FormGroup', FormGroup);

  // Layout
  app.component('EmptyLayout', AppLayoutEmpty);
  app.component('AuthLayout', AppLayoutAuth);
  app.component('DefaultLayout', AppLayoutDefault);

  // Common
  app.component('AppCommonNotFound', AppCommonNotFound);
  app.component('AppCommonEntryPoint', AppCommonEntryPoint);
};

export default RegisterBaseComponent;
