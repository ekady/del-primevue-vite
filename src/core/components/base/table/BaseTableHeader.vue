<template>
  <Card class="border-0 shadow-none rounded-b-none" :pt="{ body: { class: 'py-1' } }">
    <template #content>
      <div class="grid grid-cols-3">
        <slot>
          <div class="spacer" />
        </slot>

        <div v-if="!props.hideLimitOption" class="text-center">
          <BaseDropdown v-model:value="limit" :prime="{ options: limitOptions, filter: false }" />
        </div>

        <div v-if="!props.hideSearch" class="flex justify-end">
          <div class="p-input-icon-left p-input-icon-right">
            <i class="pi pi-search w-4" />
            <InputText v-model:modelValue="search" placeholder="Keyword Search" class="w-56" />
            <i v-if="search" class="pi pi-times cursor-pointer" @click="search = ''" />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { FIRST_PAGE, LIMIT_DEFAULT } from '@/core/constants/pagination.constant';

interface Props {
  hideSearch?: boolean;
  hideLimitOption?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  change: [{ [key: string]: TKey }];
}>();

const search = ref('');
const limit = ref(LIMIT_DEFAULT);
const limitOptions = computed(() => [5, 10, 20]);

const onChangeValue = (key: string, val: TKey) => {
  emit('change', { [key]: val, page: FIRST_PAGE });
};

watch(
  search,
  useDebounceFn(val => {
    onChangeValue('search', val);
  }, 300),
);

watch(limit, val => onChangeValue('limit', val));

defineExpose({ onChangeValue });
</script>
