<script lang="ts" setup>
import type { PageState } from 'primevue/paginator';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { onBeforeMount, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useAppTable } from '@/core/composables/useAppTable';

import { useDeleteTodo, useGetListTodo } from '../../composables/useTodo';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { todo_fetchList, todo_list, todo_listLoading } = useGetListTodo();
const { todo_deleteTodo, todo_loadingDelete } = useDeleteTodo();

const { appTable_lazyHandleTableSort, appTable_handleParams, appTable_onChange, appTable_meta } = useAppTable();

async function fetchTodos() {
  const mappedSort = { userId: 'user_id' };
  const mappedFilter = { status: 'completed' };
  todo_fetchList(appTable_handleParams(mappedSort, mappedFilter));
}

const confirm = useConfirm();
const toast = useToast();

async function deleteTodo(id: string) {
  await todo_deleteTodo(id);
  toast.add({ severity: 'success', summary: t('todo.delete_todo'), detail: t('todo.alert_message.success_delete'), closable: true });
  fetchTodos();
}

function confirmDelete(id: string, event?: MouseEvent) {
  confirm.require({
    target: event?.currentTarget as HTMLElement,
    message: t('common.confirm_delete'),
    header: t('common.delete'),
    icon: 'pi pi-trash',
    group: 'popup',
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: t('common.yes'),
    rejectLabel: t('common.no'),
    rejectProps: { outlined: true },
    accept: () => {
      deleteTodo(id);
    },
  });
}

function handlePagination(params: Record<string, TKey>) {
  router.push({ query: { ...route.query, ...params } });
}

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
    v-bind="appTable_meta"
    @sort="appTable_lazyHandleTableSort"
  >
    <Column field="action" header="" style="width: 15%">
      <template #body="{ data }">
        <BaseTableAction
          :detail-to="`/todo/${data.id}`"
          :edit-to="`/todo/${data.id}/edit`"
          @delete="(e?: MouseEvent) => confirmDelete(data.id, e)"
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
    :total-records="todo_list.total || 0"
    :current-page="Number(route.query.page) || 0"
    @change="(pageState: PageState) => handlePagination({ limit: pageState.rows, skip: pageState.first, page: pageState.page })"
  />
</template>
