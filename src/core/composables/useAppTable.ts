import { computed, reactive } from 'vue';

import { storeToRefs } from 'pinia';

import { PageState } from 'primevue/paginator';
import { DataTableSortEvent } from 'primevue/datatable';

import { useTableStore } from '@/core/store/table.store';
import { FIRST_PAGE, LIMIT_DEFAULT } from '../constants/pagination.constant';

export const initialTableOptions: IAppTableOptions = { filter: { limit: 5 }, options: {} };

/**
 * @description Composable global for table methods.
 */
export function useAppTable(tableName?: string, initial: IAppTableOptions = { ...initialTableOptions }) {
  const appTable_store = useTableStore();
  const appTable_state = storeToRefs(appTable_store).table_state;
  const appTable_options = reactive<IAppTableOptions>({
    filter: { ...appTable_state.value?.[tableName ?? ''], ...initial.filter },
    options: initial.options,
  });

  const appTable_meta = computed(() => {
    const savedState = appTable_state.value[tableName ?? ''] || {};

    const savedPage = savedState.page ?? FIRST_PAGE;
    const savedLimit = savedState.limit ?? LIMIT_DEFAULT;

    const page = appTable_options.filter?.page ?? savedPage;
    const limit = appTable_options.filter.limit ?? savedLimit;
    return {
      rows: +limit,
      first: +page * +limit,
    };
  });

  /**
   * @description Save table state (such as sort & pagination) to global table store
   */
  const appTable_saveTableState = (params: Record<string, TKey>): void => {
    const paramsSaved: IAppTableStateOptions = {
      sort: params.sort as string,
      skip: params.skip as number,
      limit: params.limit as number,
      search: params.search as string,
      page: params.page as string,
    };
    if (tableName) appTable_store.table_setTableState(tableName, paramsSaved);
  };

  /**
   * @description Clear table state from store
   */
  const appTable_clearTableState = () => {
    if (tableName) appTable_store.table_clearTableState(tableName);
  };

  /**
   * @description Change filter values
   */
  const appTable_onChange = (val: Record<string, TKey>): void => {
    const { changeType, ...filter } = val;
    if (changeType === 'saved-state') appTable_options.filter = { ...appTable_options.filter, ...filter };
    else appTable_options.filter = { ...appTable_options.filter, skip: null, ...val };
  };

  /**
   * @description Handle sort format to {field}|{direction}, example: name|asc, name|desc
   */
  const appTable_lazyHandleTableSort = (sort: DataTableSortEvent): void => {
    const field = sort.sortField;
    const order = sort.sortOrder === -1 ? 'desc' : 'asc';
    const sortOrder = field ? `${field}|${order}` : null;

    appTable_options.options = { sort: sortOrder };
  };

  /**
   * @description Handle limit & page number change
   */
  const appTable_lazyChangePage = (pageState: PageState) => {
    const skip = pageState.rows * pageState.page;
    const page = pageState.page;
    appTable_options.filter = { ...appTable_options.filter, skip, page };
  };

  /**
   * @description Transform custom sort key if different from table field key
   */
  const appTable_mappingSort = (mapping: Record<string, string> = {}): Record<string, string | null> => {
    const [sortField, sortOrder] = appTable_options.options?.sort ? appTable_options.options.sort.split('|') : [null, null];
    const field = sortField ?? null;
    const order = sortOrder ?? null;
    const mappedField = field ? mapping[field] ?? field : null;

    const newValue = mappedField && order ? `${mappedField}|${order}` : null;
    return {
      sort: newValue,
    };
  };

  /**
   * @description Transform custom filter key if different from filter field key
   */
  const appTable_mappingFilter = (mapping: Record<string, string>): Record<string, TKey> => {
    return Object.keys(appTable_options.filter).reduce((acc, key) => {
      acc[mapping?.[key] ?? key] = appTable_options.filter[key];
      return acc;
    }, {} as Record<string, TKey>);
  };

  /**
   * @description Handle custom params if sort & filter key different from table field
   * @param {Record<string, string | null>} mappedSort
   * @param {Record<string, TKey>} mappedFilter
   */
  const appTable_handleParams = (
    mappedSort?: Record<string, string>,
    mappedFilter?: Record<string, string>,
  ): Record<string, TKey> => {
    const sortMapping = mappedSort ? appTable_mappingSort(mappedSort) : null;
    const filterMapping = mappedFilter ? appTable_mappingFilter(mappedFilter) : null;

    const savedState = appTable_state.value[tableName ?? ''] || {};
    const optionsSort = sortMapping ?? appTable_options.options;
    const sortSavedState = savedState.sort ? savedState : optionsSort;

    const options = appTable_options.options.sort !== undefined ? optionsSort : { sort: sortSavedState.sort ?? null };
    const filter = filterMapping ?? appTable_options.filter;

    const finalParams = { ...savedState, ...filter, ...options };
    appTable_saveTableState(finalParams);

    return finalParams;
  };

  return {
    appTable_options,
    appTable_state,
    appTable_meta,
    appTable_lazyHandleTableSort,
    appTable_lazyChangePage,
    appTable_onChange,
    appTable_mappingSort,
    appTable_mappingFilter,
    appTable_handleParams,
    appTable_clearTableState,
  };
}
