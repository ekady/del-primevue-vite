<template>
  <div class="flex items-center gap-3">
    <slot name="start" />

    <RouterLink v-if="!props.hideDetail && props.detailTo" :to="props.detailTo" class="no-underline">
      <span v-tooltip.top="t('common.view')" class="pi pi-eye" :class="{ 'opacity-50': props.disabledDetail }" />
    </RouterLink>
    <span
      v-else
      @click="e => emit('view', e)"
      v-tooltip.top="t('common.view')"
      class="pi pi-eye"
      :class="{ 'opacity-50': props.disabledDetail, 'cursor-pointer': !props.disabledDetail }"
    />

    <RouterLink v-if="!props.hideEdit && props.editTo" :to="props.editTo" class="no-underline">
      <span v-tooltip.top="t('common.edit')" class="pi pi-pencil" :class="{ 'opacity-50': props.disabledEdit }" />
    </RouterLink>
    <span
      v-else
      @click="e => emit('edit', e)"
      v-tooltip.top="t('common.edit')"
      class="pi pi-pencil"
      :class="{ 'opacity-50': props.disabledEdit, 'cursor-pointer': !props.disabledEdit }"
    />

    <span
      v-if="!props.hideDelete"
      @click="e => emit('delete', e)"
      v-tooltip.top="t('common.delete')"
      class="pi pi-trash"
      :class="{ 'opacity-50': props.disabledDelete, 'cursor-pointer': !props.disabledDelete }"
    />

    <slot name="end" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import { RouteRecordRaw } from 'vue-router';

interface Props {
  detailTo?: RouteRecordRaw | string;
  hideDetail?: boolean;
  disabledDetail?: boolean;

  hideEdit?: boolean;
  editTo?: RouteRecordRaw | string;
  disabledEdit?: boolean;

  hideDelete?: boolean;
  disabledDelete?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  delete: [event?: MouseEvent];
  edit: [event?: MouseEvent];
  view: [event?: MouseEvent];
}>();

const { t } = useI18n();
</script>
