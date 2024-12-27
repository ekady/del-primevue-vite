<script lang="ts" setup>
import type { PageState } from 'primevue/paginator';

export interface BaseTableFooterProps {
  limit: number;
  currentPage: number;
  totalRecords: number;
  limitOptions?: number[];
}

const props = withDefaults(defineProps<BaseTableFooterProps>(), { currentPage: 0 });

const emit = defineEmits<{ change: [pageState: PageState] }>();

const defaultLimitOptions = [5, 10, 20];

function onChangePage(pageState: PageState) {
  const page = props.limit === pageState.rows ? pageState.page : 0;
  emit('change', { ...pageState, page });
}

defineExpose({ onChangePage });
</script>

<template>
  <Paginator
    :rows-per-page-options="limitOptions ?? defaultLimitOptions"
    :rows="limit"
    :total-records="totalRecords"
    :first="currentPage * limit"
    @page="onChangePage"
  />
</template>
