<script lang="ts" setup>
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useConfirm } from 'primevue/useconfirm';
import { computed, onBeforeMount, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useAuthStore } from '@/modules/auth/store/auth.store';

import { useCreateTodo, useEditTodo, useGetTodo } from '../composables/useTodo';
import type { ITodoItem } from '../model/todo.model';

interface Props {
  type: 'create' | 'edit' | 'detail';
}

const props = defineProps<Props>();
const isDetail = computed(() => props.type === 'detail');
const isCreate = computed(() => props.type === 'create');

const { params } = useRoute();

const { todo_fetchTodo, todo_todoLoading } = useGetTodo(params.id as string);
const { todo_createTodo, todo_loadingCreate } = useCreateTodo();
const { todo_editTodo, todo_loadingEdit } = useEditTodo();

const isLoading = computed(() => todo_todoLoading.value || todo_loadingCreate.value || todo_loadingEdit.value);

const { t } = useI18n();
const { push } = useRouter();
const confirm = useConfirm();

const todo = reactive<Omit<ITodoItem, 'id'>>({ completed: false, todo: '', userId: 0 });
const rules = {
  userId: { required },
  todo: { required },
};

const v$ = useVuelidate(rules, todo);

async function fetchData() {
  if (params.id) {
    const data = await todo_fetchTodo();
    todo.completed = data.completed;
    todo.todo = data.todo;
    todo.userId = data.userId;
  }
}

const { auth_userInfo } = useAuthStore();

async function submit() {
  if (!todo.userId)
    todo.userId = auth_userInfo?.id ?? 0;

  v$.value.$touch();
  if (v$.value.$invalid)
    return;

  if (params.id) {
    await todo_editTodo(params.id as string, todo);
  } else {
    await todo_createTodo(todo);
  }

  confirm.require({
    message: isCreate.value ? t('todo.alert_message.success_create') : t('todo.alert_message.success_update'),
    header: t('common.success'),
    icon: 'pi pi-check-circle',
    acceptLabel: t('common.ok'),
    accept: () => {
      push({ name: 'todo' });
    },
    onHide: () => {
      push({ name: 'todo' });
    },
    rejectClass: '!hidden',
    rejectProps: { outlined: true },
  });
}

function confirmLeavePage() {
  confirm.require({
    message: t('common.confirm_leave_page'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: t('common.yes'),
    accept: () => {
      push({ name: 'todo' });
    },
    rejectLabel: t('common.no'),
    rejectProps: { outlined: true },
  });
}

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <form @submit.prevent="submit">
    <Card>
      <template #content>
        <div class="grid grid-cols-1 gap-4">
          <FormGroup v-slot="{ classes }" :label="t('todo.todo')" no-gutter :validator="v$.todo">
            <BaseLabel :title="t('todo.todo')" />
            <InputText v-if="!isDetail" v-model:model-value="todo.todo" :disabled="isLoading" :class="{ ...classes }" />
            <BaseLabel v-else :title="todo.todo" size="16" :is-bold="false" />
          </FormGroup>

          <FormGroup v-slot="{ classes }" :label="t('todo.completed')" no-gutter>
            <div class="flex items-center gap-4">
              <BaseLabel :title="t('todo.completed')" />
              <Checkbox v-if="!isDetail" v-model="todo.completed" :disabled="isLoading" binary :class="classes" class="mt-2" />
              <BaseLabel v-else :title="todo.completed ? t('common.yes') : t('common.no')" size="16" :is-bold="false" />
            </div>
          </FormGroup>
        </div>
      </template>
    </Card>

    <div class="flex items-center justify-end gap-2 mt-4">
      <template v-if="!isDetail">
        <Button :label="t('common.cancel')" outlined :disabled="isLoading" @click="confirmLeavePage" />
        <Button :label="t('common.submit')" :loading="isLoading" type="submit" />
      </template>
      <RouterLink v-else :to="{ name: 'todo' }">
        <Button :label="t('common.back')" outlined :disabled="isLoading" />
      </RouterLink>
      <Button v-if="isDetail" :label="t('common.edit')" as="router-link" :to="`/todo/${params.id}/edit`" :disabled="isLoading" class="no-underline" />
    </div>
  </form>
</template>
