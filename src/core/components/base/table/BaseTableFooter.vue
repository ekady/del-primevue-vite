<template>
  <Paginator
    :template="{
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput',
    }"
    :rows="props.limit"
    :totalRecords="props.totalRecords"
    @page="onChangePage"
  >
  </Paginator>
</template>

<script lang="ts" setup>
import { PageState } from 'primevue/paginator';

export interface BaseTableFooterProps {
  limit: number;
  totalRecords: number;
}

const props = defineProps<BaseTableFooterProps>();

const emit = defineEmits<{
  change: [page: number];
}>();

const onChangePage = (pageState: PageState) => {
  emit('change', pageState.page);
};

defineExpose({ onChangePage });
</script>
