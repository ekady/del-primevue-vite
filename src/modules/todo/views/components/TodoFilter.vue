<template>
  <BaseCardFilter>
    <FormGroup :label="t('todo.id')" noGutter class="w-full">
      <BaseLabel :title="t('todo.id')" />
      <BaseDropdown
        :value="route.query.id ? Number(route.query.id) : null"
        :prime="{
          options: ids,
          showClear: true,
          placeholder: t('todo.select_id'),
        }"
        @change="(val: string) => onChangeFilter('id', val)"
      />
    </FormGroup>

    <FormGroup :label="t('todo.status')" noGutter class="w-full">
      <BaseLabel :title="t('todo.status')" />
      <BaseDropdown
        :value="route.query.status"
        :prime="{
          options: statuses,
          optionLabel: 'text',
          showClear: true,
          placeholder: t('todo.select_status'),
        }"
        optionValue="value"
        @change="(val: string) => onChangeFilter('status', val)"
      />
    </FormGroup>

    <FormGroup :label="t('todo.user_id')" noGutter class="w-full">
      <BaseLabel :title="t('todo.user_id')" />
      <BaseDropdown
        :value="route.query.userId ? Number(route.query.userId) : null"
        :prime="{
          options: userIds,
          showClear: true,
          placeholder: t('todo.select_user_id'),
        }"
        @change="(val: string) => onChangeFilter('userId', val)"
      />
    </FormGroup>
  </BaseCardFilter>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const emit = defineEmits<{
  change: [Record<string, TKey>];
}>();

const route = useRoute();
const router = useRouter();

const onChangeFilter = (key: string, value: TKey) => {
  console.log(key, value);
  router.push({ query: { ...route.query, [key]: value } });
};

const ids = [1, 2, 3, 4, 5];
const statuses = [
  { text: t('todo.completed'), value: 'true' },
  { text: t('todo.not_complete'), value: 'false' },
];
const userIds = [10, 11, 12, 13, 14, 15];
</script>
