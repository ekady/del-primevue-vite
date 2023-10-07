<template>
  <form @submit.prevent="submit">
    <Card>
      <template #content>
        <div class="grid grid-cols-1 gap-4">
          <FormGroup :label="t('todo.todo')" noGutter :validator="v$.todo" v-slot="{ classes }">
            <BaseLabel :title="t('todo.todo')" />
            <InputText v-if="!isDetail" :disabled="todo_loading" v-model:model-value="todo.todo" :class="{ ...classes }" />
            <BaseLabel v-else :title="todo.todo" size="16" :is-bold="false" />
          </FormGroup>

          <FormGroup :label="t('todo.completed')" noGutter v-slot="{ classes }">
            <div class="flex items-center gap-4">
              <BaseLabel :title="t('todo.completed')" />
              <Checkbox v-if="!isDetail" v-model="todo.completed" :disabled="todo_loading" binary :class="classes" class="mt-2" />
              <BaseLabel v-else :title="todo.completed ? t('common.yes') : t('common.no')" size="16" :is-bold="false" />
            </div>
          </FormGroup>
        </div>
      </template>
    </Card>

    <div class="flex items-center justify-end gap-2 mt-4">
      <template v-if="!isDetail">
        <Button @click="confirmLeavePage" :label="t('common.cancel')" outlined :disabled="todo_loading" />
        <Button :label="t('common.submit')" :loading="todo_loading" type="submit" />
      </template>
      <RouterLink v-else :to="{ name: 'todo' }">
        <Button :label="t('common.back')" outlined :disabled="todo_loading" />
      </RouterLink>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useConfirm } from 'primevue/useconfirm';

import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { useTodo } from '../composables';
import { ITodoItem } from '../model/todo.model';
import useAuth from '@/modules/auth/composables/useAuth';

interface Props {
  type: 'create' | 'edit' | 'detail';
}

const props = defineProps<Props>();
const isDetail = computed(() => props.type === 'detail');
const isCreate = computed(() => props.type === 'create');

const { t } = useI18n();
const { params } = useRoute();
const { push } = useRouter();
const confirm = useConfirm();

const { todo_loading, todo_createUpdateTodo, todo_fetchTodo } = useTodo();
const todo = reactive<Omit<ITodoItem, 'id'>>({ completed: false, todo: '', userId: 0 });
const rules = {
  userId: { required },
  todo: { required },
};

const v$ = useVuelidate(rules, todo);

const fetchData = async () => {
  if (params.id) {
    const data = await todo_fetchTodo(params.id as string);
    todo.completed = data.completed;
    todo.todo = data.todo;
    todo.userId = data.userId;
  }
};

const { auth_userInfo } = useAuth();

const submit = async () => {
  if (!todo.userId) todo.userId = auth_userInfo.value?.id ?? 0;

  v$.value.$touch();
  if (v$.value.$invalid) return;

  await todo_createUpdateTodo(todo, (params.id as string) ?? null);

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
  });
};

const confirmLeavePage = () => {
  confirm.require({
    message: t('common.confirm_leave_page'),
    header: t('common.warning'),
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: t('common.yes'),
    accept: () => {
      push({ name: 'todo' });
    },
    rejectLabel: t('common.no'),
  });
};

onBeforeMount(() => {
  fetchData();
});
</script>
