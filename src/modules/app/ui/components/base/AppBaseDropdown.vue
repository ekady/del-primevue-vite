<template>
  <Dropdown v-bind="attrs" v-model:model-value="modelValue">
    <template #content="slotProps">
      <slot name="content" v-bind="slotProps" />
    </template>
    <template #empty="slotProps">
      <slot name="empty" v-bind="slotProps" />
    </template>
    <template #emptyfilter="slotProps">
      <slot name="emptyfilter" v-bind="slotProps" />
    </template>
    <template #footer="slotProps">
      <slot name="footer" v-bind="slotProps" />
    </template>
    <template #header="slotProps">
      <slot name="header" v-bind="slotProps" />
    </template>
    <template #indicator>
      <slot name="indicator" />
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
      <slot name="value" v-bind="slotProps">
        <div>{{ slotProps.value[(attrs.optionLabel as string) || 'label'] }}</div>
      </slot>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { ref, watch, useAttrs, onBeforeMount } from 'vue';
import { DropdownProps } from 'primevue/dropdown';

export interface Props {
  value?: any;
  returnObject?: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:value', value: any): void;
}>();

const attrs: DropdownProps = useAttrs();

const modelValue = ref<any>();

const onChangeValue = () => {
  if (!props.returnObject && modelValue.value && typeof modelValue.value !== 'string') {
    emit('update:value', modelValue.value[(attrs.optionValue as string) || 'value']);
  } else emit('update:value', modelValue.value);
};

const setPropsValue = () => {
  if (typeof props.value === 'object') modelValue.value = props.value;
  else {
    modelValue.value = (attrs.options as any[])?.find(option => {
      if (typeof option === 'string') return option === props.value;

      const optionValue = (attrs.optionValue as string) || 'value';
      return option[optionValue] === props.value;
    });
  }
  onChangeValue();
};

watch(
  () => props.value,
  val => val && setPropsValue(),
);

watch(modelValue, () => onChangeValue());

onBeforeMount(() => {
  if (props.value) setPropsValue();
});
</script>
