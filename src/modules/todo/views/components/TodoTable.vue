<template>
  <BaseTableHeader @change="appTable_onChange">
    <RouterLink :to="{ name: 'todoCreate' }">
      <Button :label="t('todo.create')" />
    </RouterLink>
  </BaseTableHeader>
  <DataTable
    :value="todo_list.todos"
    :loading="todo_listLoading || todo_loadingDelete"
    lazy
    sor
    @sort="appTable_lazyHandleTableSort"
    v-bind="appTable_meta"
  >
    <Column field="action" header="" style="width: 15%">
      <template #body="{ data }">
        <BaseTableAction
          :detail-to="`/todo/${data.id}`"
          :edit-to="`/todo/${data.id}/edit`"
          @delete="(e: MouseEvent) => confirmDelete(data.id, e)"
        />
      </template>
    </Column>
    <Column field="id" :header="t('todo.id')" style="width: 15%" />
    <Column field="userId" :header="t('todo.user_id')" style="width: 15%" />
    <Column field="todo" :header="t('todo.todo')" style="width: 25%" />
    <Column field="complete" :header="t('todo.status')" style="width: 25%">
      <template #body="{ data }">
        <Tag v-if="data.completed" :value="t('todo.complete')" severity="success" />
        <Tag v-else :value="t('todo.not_complete')" severity="warning" />
      </template>
    </Column>
  </DataTable>
  <BaseTableFooter
    :limit="Number(route.query.limit) || 5"
    :totalRecords="todo_list.total || 0"
    :currentPage="Number(route.query.page) || 0"
    @change="(pageState: PageState) => handlePagination({limit: pageState.rows, skip: pageState.first, page: pageState.page})"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import { useRoute, useRouter } from 'vue-router';
import { useDeleteTodo, useGetListTodo } from '../../composables/useTodo';
import { useAppTable } from '@/core/composables/useAppTable';
import type { PageState } from 'primevue/paginator';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { todo_fetchList, todo_list, todo_listLoading } = useGetListTodo();
const { todo_deleteTodo, todo_loadingDelete } = useDeleteTodo();

const { appTable_lazyHandleTableSort, appTable_handleParams, appTable_onChange, appTable_meta } = useAppTable();

const fetchTodos = async () => {
  const mappedSort = { userId: 'user_id' };
  const mappedFilter = { status: 'completed' };
  todo_fetchList(appTable_handleParams(mappedSort, mappedFilter));
};

const confirm = useConfirm();
const toast = useToast();

const deleteTodo = async (id: string) => {
  await todo_deleteTodo(id);
  toast.add({ severity: 'success', summary: 'Delete Todo', detail: t('todo.alert_message.success_delete'), closable: true });
  fetchTodos();
};

const confirmDelete = (id: string, event?: MouseEvent) => {
  confirm.require({
    target: event?.currentTarget as HTMLElement,
    message: t('common.confirm_delete'),
    icon: 'pi pi-trash',
    group: 'popup',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    accept: () => {
      deleteTodo(id);
    },
  });
};

const handlePagination = (params: Record<string, TKey>) => {
  router.push({ query: { ...route.query, ...params } });
};

watch<Record<string, string>, true>(
  () => route.query as Record<string, string>,
  () => fetchTodos(),
);

onBeforeMount(() => {
  fetchTodos();
});

defineExpose({
  fetchTodos,
  confirmDelete,
  deleteTodo,
});
</script>
