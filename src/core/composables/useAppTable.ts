import { computed } from 'vue';

import { PageState } from 'primevue/paginator';
import { DataTableSortEvent } from 'primevue/datatable';

import { FIRST_PAGE, LIMIT_DEFAULT } from '../constants/pagination.constant';
import { useRoute, useRouter } from 'vue-router';

export const initialTableOptions: IAppTableOptions = { filter: { limit: 5 }, options: {} };

/**
 * @description Composable global for table methods.
 */
export function useAppTable() {
  const route = useRoute();
  const router = useRouter();

  const appTable_meta = computed(() => {
    const page = route.query.page || FIRST_PAGE;
    const limit = route.query.limit || LIMIT_DEFAULT;
    return {
      rows: +limit,
      first: +page * +limit,
    };
  });

  /**
   * @description Change filter values
   */
  const appTable_onChange = (val: Record<string, TKey>): void => {
    router.push({ query: { ...route.query, ...val } });
  };

  /**
   * @description Handle sort format to {field}|{direction}, example: name|asc, name|desc
   */
  const appTable_lazyHandleTableSort = (sort: DataTableSortEvent): void => {
    const field = sort.sortField;
    const order = sort.sortOrder === -1 ? 'desc' : 'asc';
    const sortOrder = field ? `${field}|${order}` : null;

    router.push({ query: { ...route.query, sort: sortOrder } });
  };

  /**
   * @description Handle limit & page number change
   */
  const appTable_lazyChangePage = (pageState: PageState) => {
    const skip = pageState.rows * pageState.page;
    const page = pageState.page;
    router.push({ query: { ...route.query, skip, page } });
  };

  /**
   * @description Transform custom sort key if different from table field key
   */
  const appTable_mappingSort = (mapping: Record<string, string> = {}): Record<string, string | null> => {
    const [sortField, sortOrder] = route.query?.sort ? (route.query.sort as string).split('|') : [null, null];
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
    return Object.keys(route.query).reduce((acc, key) => {
      acc[mapping?.[key] ?? key] = route.query[key] as TKey;
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

    const optionSort = (sortMapping?.sort as string) || (route.query.sort as string);
    const filter = filterMapping || (route.query as Record<string, TKey>);

    return { ...filter, sort: optionSort || null, page: appTable_meta.value.first, limit: appTable_meta.value.rows };
  };

  return {
    appTable_meta,
    appTable_lazyHandleTableSort,
    appTable_lazyChangePage,
    appTable_onChange,
    appTable_mappingSort,
    appTable_mappingFilter,
    appTable_handleParams,
  };
}
