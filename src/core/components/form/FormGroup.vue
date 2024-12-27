<script lang="ts" setup>
import type { BaseValidation, ErrorObject } from '@vuelidate/core';
import type { ComputedRef } from 'vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export interface Props {
  label: string;
  validator?: BaseValidation;
  messages?: Record<string, string>;
  hideError?: boolean;
  noGutter?: boolean;
}

const props = defineProps<Props>();
const { t } = useI18n();

const firstError: ComputedRef<ErrorObject | null> = computed(() => {
  if (props.validator && props.validator?.$errors?.length > 0) {
    return props.validator.$errors[0];
  }
  return null;
});

const message: ComputedRef<string> = computed(() => {
  const firstErrorValidator = firstError.value ? firstError?.value?.$validator : null;

  if (firstErrorValidator && props.messages && props.messages[firstErrorValidator]) {
    return t(props.messages[firstErrorValidator], { attribute: props.label });
  }
  if (firstErrorValidator) {
    return t(`validations.${firstErrorValidator}`, { attribute: props.label });
  }
  return '';
});

const isValidValue: ComputedRef<boolean> = computed(() => {
  return !props.validator?.$invalid;
});

defineExpose({ firstError, message, isValidValue });
</script>

<template>
  <div class="flex flex-col gap-1" :class="noGutter ? 'mb-2' : 'mb-4'">
    <slot :is-error="!!firstError" :is-valid="isValidValue" :classes="{ 'p-invalid': !!firstError, 'p-success': isValidValue }" />
    <small v-if="!props.hideError && !!firstError" class="p-error">{{ message }}</small>
  </div>
</template>
