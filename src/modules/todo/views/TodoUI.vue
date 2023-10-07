<template>
  <template v-if="false">
    <TodoFilter @change="onChangeFilter" />
    <div style="height: 40px" />
  </template>
  <TodoTable />
</template>

<script lang="ts" setup>
import { provide, ref } from 'vue';
import { TODO_FILTER } from '@/modules/todo/constants/todo.constant';
import TodoFilter from './components/TodoFilter.vue';
import TodoTable from './components/TodoTable.vue';

const filter = ref<Record<string, TKey>>({});

const onChangeFilter = (params: Record<string, TKey>) => {
  filter.value = params;
};

provide(TODO_FILTER, filter);
</script>
