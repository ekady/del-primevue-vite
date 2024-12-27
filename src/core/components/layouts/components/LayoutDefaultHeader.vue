<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useConfirm } from 'primevue/useconfirm';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useThemeStore } from '@/core/store/theme.store';
import { useAuthStore } from '@/modules/auth/store/auth.store';

const emit = defineEmits<{ toggle: [] }>();

const { locale, t } = useI18n();
const router = useRouter();
const confirm = useConfirm();
const popover = ref();

function togglePopover(event: MouseEvent) {
  popover.value?.toggle(event);
}

const { auth_doLogout } = useAuthStore();

function onLogout() {
  auth_doLogout();
  router.replace('/');
}

function confirmLogout(event?: MouseEvent) {
  confirm.require({
    target: event?.currentTarget as HTMLElement,
    message: t('common.confirm_logout'),
    icon: 'pi pi-sign-out',
    header: t('common.logout'),
    acceptIcon: 'pi pi-check',
    rejectIcon: 'pi pi-times',
    acceptLabel: t('common.logout'),
    rejectLabel: t('common.no'),
    rejectProps: { outlined: true },
    accept: onLogout,
  });
}

const languages = ref([
  { text: 'English', value: 'en' },
  { text: 'Indonesia', value: 'id' },
]);

function changeLang(val: string) {
  locale.value = val;
  localStorage.setItem('lang', val);
}

const themeStore = useThemeStore();
const { theme_appTheme } = storeToRefs(themeStore);
function toggleThemeChange() {
  themeStore.theme_changeTheme();
}

defineExpose({ changeLang });
</script>

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
          rounded
          outlined
          severity="secondary"
          class="!w-10 !h-10 box-border border"
          @click="toggleThemeChange"
        />
        <div class="card flex justify-center">
          <Avatar icon="pi pi-user" shape="circle" class="cursor-pointer !w-10 !h-10 box-border" @click="togglePopover" />

          <Popover ref="popover">
            <div class="flex flex-col gap-4 w-[16rem]">
              <Button type="button" :label="t('common.logout')" icon="pi pi-sign-out" text class="text-left" @click="confirmLogout" />
            </div>
          </Popover>
        </div>
      </div>
    </template>
  </Toolbar>
</template>

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
