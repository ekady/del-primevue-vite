<script setup lang="ts">
import type { Emitter } from 'mitt';
import { useToast } from 'primevue/usetoast';
import { computed, inject, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

import { updateTheme, useThemeStore } from './core/store/theme.store';

const bus = inject<Emitter<TBusEvent>>('bus');
const toast = useToast();
const loading = ref(false);

bus?.on('toast', event => {
  toast.add(event);
});

bus?.on('loading_app', isLoading => {
  loading.value = isLoading;
});

const route = useRoute();
const layout = computed(() => {
  return `${route.meta.layout ?? 'empty'}-layout`;
});

const theme = useThemeStore();
onBeforeMount(() => {
  updateTheme(theme.theme_appTheme);
});
</script>

<template>
  <component :is="layout" />
  <Toast />
  <ConfirmPopup group="popup" />
  <ConfirmDialog />
  <Dialog
    v-model:visible="loading"
    modal
    :show-header="false"
    :closable="false"
    :style="{ width: '200px', height: '200px' }"
    :pt="{ content: { class: 'h-full pt-4' } }"
  >
    <div class="h-full w-full flex items-center justify-center">
      <ProgressSpinner style="width: 100px; height: 100px" stroke-width="8" aria-label="Loading..." />
    </div>
  </Dialog>
</template>
