<template>
  <div class="flex items-center">
    <slot name="start" />

    <Button
      v-if="!props.hideDetail"
      @click="e => emit('view', e)"
      v-tooltip.top="t('common.view')"
      :to="props.detailTo"
      rounded
      outlined
      text
      :as="detailTo ? 'router-link' : ''"
      icon="pi pi-eye"
      :class="{ 'opacity-50': props.disabledDetail, 'cursor-pointer': !props.disabledDetail, 'no-underline': true }"
    />

    <Button
      v-if="!props.hideEdit"
      @click="e => emit('edit', e)"
      v-tooltip.top="t('common.edit')"
      :to="props.editTo"
      rounded
      outlined
      text
      :as="editTo ? 'router-link' : ''"
      icon="pi pi-pencil"
      :class="{ 'opacity-50': props.disabledEdit, 'cursor-pointer': !props.disabledEdit, 'no-underline': true }"
    />

    <Button
      v-if="!props.hideDelete"
      @click="e => emit('delete', e)"
      v-tooltip.top="t('common.delete')"
      rounded
      outlined
      text
      icon="pi pi-trash"
      :class="{ 'opacity-50': props.disabledDelete, 'cursor-pointer': !props.disabledDelete, 'no-underline': true }"
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
