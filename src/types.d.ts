import type { ToastMessageOptions } from 'primevue/toast';

export {};

declare global {
  type TKey = string | number | null;

  interface IAppTableStateOptions {
    sort?: string | null;
    skip?: number;
    limit?: number;
    search?: string;
    page?: number | string;
  }

  interface IAppTableOptions {
    options: IAppTableStateOptions;
    filter: Record<string, TKey>;
  }

  interface IComponentComposableOptions {
    clearBeforeUnmount?: boolean;
  }

  interface IPagination {
    total: number;
    skip: number;
    limit: number;
  }

  interface IAppTheme {
    theme_appTheme: 'dark' | 'light';
  }

  type TBusEvent = {
    toast: ToastMessageOptions;
    loading_app: boolean;
  };
}
