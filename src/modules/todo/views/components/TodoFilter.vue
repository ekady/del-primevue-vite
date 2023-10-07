<template>
  <BaseCardFilter>
    <FormGroup :label="t('todo.id')" noGutter class="w-full">
      <BaseLabel :title="t('todo.id')" />
      <BaseDropdown
        v-model:value="filter.id"
        :prime="{
          options: ids,
          showClear: true,
        }"
      />
    </FormGroup>

    <FormGroup :label="t('todo.status')" noGutter class="w-full">
      <BaseLabel :title="t('todo.status')" />
      <BaseDropdown
        v-model:value="filter.status"
        :prime="{
          options: statuses,
          optionLabel: 'text',
          optionValue: 'value',
          showClear: true,
        }"
      />
    </FormGroup>

    <FormGroup :label="t('todo.user_id')" noGutter class="w-full">
      <BaseLabel :title="t('todo.user_id')" />
      <BaseDropdown
        v-model:value="filter.userId"
        :prime="{
          options: userIds,
          showClear: true,
        }"
      />
    </FormGroup>
  </BaseCardFilter>
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const emit = defineEmits<{
  change: [Record<string, TKey>];
}>();

const filter = reactive<Record<string, TKey>>({
  id: null,
  status: null,
  userId: null,
});

watch(filter, val => emit('change', val));

const ids = [1, 2, 3, 4, 5];
const statuses = [
  { text: t('todo.completed'), value: true },
  { text: t('todo.not_complete'), value: false },
];
const userIds = [10, 11, 12, 13, 14, 15];
</script>
