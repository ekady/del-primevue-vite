<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { FIRST_PAGE } from '@/core/constants/pagination.constant';

interface Props {
  hideSearch?: boolean;
  hideLimitOption?: boolean;
}
const props = defineProps<Props>();

const emit = defineEmits<{
  change: [{ [key: string]: TKey }];
}>();

const { t } = useI18n();

const search = ref('');

function onChangeValue(key: string, val: TKey) {
  emit('change', { [key]: val, page: FIRST_PAGE });
}

watch(
  search,
  useDebounceFn(val => {
    onChangeValue('search', val);
  }, 300),
);

defineExpose({ onChangeValue });
</script>

<template>
  <Card class="border-0 shadow-none rounded-b-none" :pt="{ body: { class: 'py-1' } }">
    <template #content>
      <div class="grid grid-cols-3">
        <slot>
          <div class="spacer" />
        </slot>

        <div />

        <div v-if="!props.hideSearch" class="flex justify-end">
          <InputGroup>
            <InputGroupAddon> <i class="pi pi-search w-4" /></InputGroupAddon>
            <InputText v-model:model-value="search" :placeholder="t('common.search')" class="w-auto" />
            <InputGroupAddon v-if="search">
              <i class="pi pi-times cursor-pointer" @click="search = ''" />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    </template>
  </Card>
</template>
