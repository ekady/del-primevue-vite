<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import type { RouteRecordRaw } from 'vue-router';

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

<template>
  <div class="flex items-center">
    <slot name="start" />

    <Button
      v-if="!props.hideDetail"
      v-tooltip.top="t('common.view')"
      :to="props.detailTo"
      rounded
      outlined
      text
      :as="detailTo ? 'router-link' : ''"
      icon="pi pi-eye"
      class="no-underline"
      :class="{ 'opacity-50': props.disabledDetail, 'cursor-pointer': !props.disabledDetail }" @click="e => emit('view', e)"
    />

    <Button
      v-if="!props.hideEdit"
      v-tooltip.top="t('common.edit')"
      :to="props.editTo"
      rounded
      outlined
      text
      :as="editTo ? 'router-link' : ''"
      icon="pi pi-pencil"
      class="no-underline"
      :class="{ 'opacity-50': props.disabledEdit, 'cursor-pointer': !props.disabledEdit }" @click="e => emit('edit', e)"
    />

    <Button
      v-if="!props.hideDelete"
      v-tooltip.top="t('common.delete')"
      rounded
      outlined
      text
      icon="pi pi-trash"
      class="no-underline"
      :class="{ 'opacity-50': props.disabledDelete, 'cursor-pointer': !props.disabledDelete }" @click="e => emit('delete', e)"
    />

    <slot name="end" />
  </div>
</template>
