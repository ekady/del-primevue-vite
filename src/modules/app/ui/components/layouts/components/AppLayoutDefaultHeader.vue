<template>
  <Toolbar>
    <template #start>
      <i class="pi pi-bars cursor-pointer mr-3 hover:text-blue-600 text-slate-600" />
      <AppBaseBreadcrumb />
    </template>

    <template #end>
      <AppBaseDropdown
        :value="locale"
        :options="languages"
        optionLabel="text"
        auto-filter-focus
        filter
        reset-filter-on-hide
        @update:value="changeLang"
      />
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

const languages = ref([
  { text: 'English', value: 'en' },
  { text: 'Indonesia', value: 'id' },
]);

const changeLang = (val: string) => {
  locale.value = val;
};
</script>

<style lang="scss" scoped>
@layer components {
  .p-dropdown {
    @apply w-32;
  }

  .p-dropdown-label {
    @apply text-sm;
  }

  .p-toolbar {
    @apply border-none border-r-0;
  }
}
</style>
