<template>
  <Dropdown v-bind="{ ...defaultPrimeProps, ...props.prime }" v-model:model-value="modelValue">
    <template #content="slotProps">
      <slot name="content" v-bind="slotProps" />
    </template>
    <template #emptyfilter>
      <slot name="emptyfilter" />
    </template>
    <template #footer="slotProps">
      <slot name="footer" v-bind="slotProps" />
    </template>
    <template #header="slotProps">
      <slot name="header" v-bind="slotProps" />
    </template>
    <template #loader="slotProps">
      <slot name="loader" v-bind="slotProps" />
    </template>
    <template #option="slotProps">
      <slot name="option" v-bind="slotProps" />
    </template>
    <template #optiongroup="slotProps">
      <slot name="optiongroup" v-bind="slotProps" />
    </template>
    <template #value="slotProps">
      <slot v-if="![null, undefined].includes(slotProps.value)" name="value" v-bind="slotProps">
        <span v-if="props.prime?.optionLabel && typeof slotProps.value === 'object'">
          {{ slotProps.value?.[(props.prime.optionLabel as string) || 'label'] || slotProps.value }}
        </span>
        <span v-else-if="slotProps.value"> {{ slotProps.value }} </span>
      </slot>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref, watch, onBeforeMount } from 'vue';

import { DropdownProps } from 'primevue/dropdown';

import isEqual from 'lodash/isEqual';

const defaultPrimeProps = {
  autoFilterFocus: true,
  filter: true,
  resetFilterOnHide: true,
};

export interface Props {
  value?: any;
  returnObject?: boolean;
  dense?: boolean;
  prime?: DropdownProps;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'update:value': [value: any];
  change: [value: any];
}>();

const modelValue = ref<any>();

const onChangeValue = () => {
  let val = null;

  if (!props.returnObject && ![null, undefined].includes(modelValue.value) && typeof modelValue.value === 'object') {
    const valueKey = (props.prime?.optionValue as string) || 'value';
    val = modelValue.value[valueKey];
  } else {
    val = modelValue.value;
  }

  emit('update:value', val);
  emit('change', val);
};

const setPropsValue = () => {
  if (typeof props.value === 'object') modelValue.value = props.value;
  else {
    modelValue.value = (props.prime?.options as any[])?.find(option => {
      if (typeof option !== 'object' && typeof props.value !== 'object') return option === props.value;

      const optionValue = (props.prime?.optionValue as string) || 'value';

      if (props.value?.[optionValue]) return option[optionValue] === props.value[optionValue];

      return option[optionValue] === props.value;
    });
  }
  onChangeValue();
};

watch(
  () => props.value,
  () => setPropsValue(),
);

watch(modelValue, (val, oldVal) => {
  const valPojo = typeof val === 'object' ? JSON.parse(JSON.stringify(val)) : val;
  const oldValPojo = typeof oldVal === 'object' ? JSON.parse(JSON.stringify(oldVal)) : oldVal;

  if (!isEqual(valPojo, oldValPojo)) onChangeValue();
});

onBeforeMount(() => {
  if (props.value) setPropsValue();
});

defineExpose({ onChangeValue, setPropsValue });
</script>

<style lang="scss" scoped>
@layer components {
  :deep(.p-dropdown-label.p-inputtext) {
    @apply shadow-none;
  }

  .p-dropdown.dense {
    :deep(.p-inputtext) {
      @apply py-2;
    }
  }
}
</style>
