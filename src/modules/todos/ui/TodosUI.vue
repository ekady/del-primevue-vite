<template>
  <AppBaseDropdown v-model:value="value" :options="options" optionLabel="label" filter autoFilterFocus resetFilterOnHide />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref<string>('en');
const options = ref<any[]>([
  { label: 'English', value: 'en' },
  { label: 'Indonesia', value: 'id' },
]);
</script>
