<template>
  <RouterView />
</template>

<script setup lang="ts">
import { onBeforeRouteUpdate, onBeforeRouteLeave, RouteLocationNormalized } from 'vue-router';

import { useTableStore } from '@/core/store/table.store';

export interface Props {
  tableNames?: string[];
}

const props = defineProps<Props>();
const tableStore = useTableStore();

const clearTableState = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to?.meta?.menuGroup !== from?.meta?.menuGroup) {
    props.tableNames?.forEach(tableName => {
      tableStore.table_clearTableState(tableName);
    });
  }
};

onBeforeRouteUpdate(clearTableState);
onBeforeRouteLeave(clearTableState);

defineExpose({ clearTableState });
</script>
