<template>
  <BaseTableHeader @change="appTable_onChange" hide-search>
    <RouterLink :to="{ name: 'todoCreate' }">
      <Button :label="t('todo.create')" />
    </RouterLink>
  </BaseTableHeader>
  <DataTable
    :value="todo_list.todos"
    :loading="todo_loading"
    lazy
    paginator
    sor
    @sort="appTable_lazyHandleTableSort"
    v-bind="appTable_meta"
    :totalRecords="todo_list.total || 0"
    @page="appTable_lazyChangePage"
  >
    <Column field="action" header="" style="width: 15%">
      <template #body="{ data }">
        <BaseTableAction
          :detail-to="`/todo/${data.id}`"
          :edit-to="`/todo/${data.id}/edit`"
          @delete="e => confirmDelete(data.id, e)"
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
</template>

<script lang="ts" setup>
import { onBeforeMount, watch, inject, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

import { useTodo } from '@/modules/todo/composables';
import { useAppTable } from '@/core/composables/useAppTable';
import { TODO_FILTER, TODO_TABLE_NAME } from '@/modules/todo/constants/todo.constant';

const filter = inject<Ref<Record<string, TKey>>>(TODO_FILTER);

const { t } = useI18n();

const { todo_fetchTodos, todo_deleteTodo, todo_list, todo_loading } = useTodo({ clearBeforeUnmount: true });

const {
  appTable_lazyHandleTableSort,
  appTable_options,
  appTable_handleParams,
  appTable_onChange,
  appTable_lazyChangePage,
  appTable_meta,
} = useAppTable(TODO_TABLE_NAME.todo);

const fetchTodos = async () => {
  const mappedSort = { userId: 'user_id' };
  const mappedFilter = { status: 'completed' };
  todo_fetchTodos(appTable_handleParams(mappedSort, mappedFilter));
};

const confirm = useConfirm();
const toast = useToast();

const deleteTodo = async (id: string) => {
  await todo_deleteTodo(id);
  toast.add({ severity: 'success', detail: t('todo.alert_message.success_delete') });
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

watch(
  () => filter?.value,
  val => val && appTable_onChange(val),
  { deep: true },
);

watch<IAppTableOptions, true>(appTable_options, async () => {
  await fetchTodos();
});

onBeforeMount(() => {
  fetchTodos();
});

defineExpose({
  fetchTodos,
  confirmDelete,
  deleteTodo,
});
</script>
