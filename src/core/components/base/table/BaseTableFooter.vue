<template>
  <Paginator
    :rowsPerPageOptions="limitOptions ?? defaultLimitOptions"
    :rows="limit"
    :totalRecords="totalRecords"
    :first="currentPage * limit"
    @page="onChangePage"
  />
</template>

<script lang="ts" setup>
import { PageState } from 'primevue/paginator';

export interface BaseTableFooterProps {
  limit: number;
  currentPage: number;
  totalRecords: number;
  limitOptions?: number[];
}

const props = withDefaults(defineProps<BaseTableFooterProps>(), { currentPage: 0 });

const defaultLimitOptions = [5, 10, 20];

const emit = defineEmits<{ change: [pageState: PageState] }>();

const onChangePage = (pageState: PageState) => {
  const page = props.limit === pageState.rows ? pageState.page : 0;
  emit('change', { ...pageState, page });
};

defineExpose({ onChangePage });
</script>
