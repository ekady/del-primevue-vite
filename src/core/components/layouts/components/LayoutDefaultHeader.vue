<template>
  <Toolbar class="rounded-none">
    <template #start>
      <span class="pi pi-bars cursor-pointer mr-3 hover:text-blue-600 text-slate-600 block lg:hidden" @click="emit('toggle')" />
      <BaseBreadcrumb />
    </template>

    <template #end>
      <div class="flex items-center gap-2">
        <BaseDropdown
          :value="locale"
          :prime="{
            options: languages,
            optionLabel: 'text',
          }"
          dense
          @update:value="changeLang"
        />
        <Button
          :icon="theme_appTheme === 'light' ? 'pi pi-moon' : 'pi pi-sun'"
          @click="toggleThemeChange"
          rounded
          outlined
          severity="secondary"
          class="!w-10 !h-10 box-border border"
        />
      </div>
    </template>
  </Toolbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';

import { useThemeStore } from '@/core/store/theme.store';

const emit = defineEmits<{
  toggle: [];
}>();

const { locale } = useI18n();

const languages = ref([
  { text: 'English', value: 'en' },
  { text: 'Indonesia', value: 'id' },
]);

const changeLang = (val: string) => {
  locale.value = val;
  localStorage.setItem('lang', val);
};

const themeStore = useThemeStore();
const { theme_appTheme } = storeToRefs(themeStore);
const toggleThemeChange = () => {
  themeStore.theme_changeTheme();
};

defineExpose({ changeLang });
</script>

<style lang="scss" scoped>
@layer components {
  .p-dropdown-label {
    @apply text-sm;
  }

  .p-toolbar {
    @apply border-none border-r-0 box-border px-4 py-3;
  }
}
</style>
