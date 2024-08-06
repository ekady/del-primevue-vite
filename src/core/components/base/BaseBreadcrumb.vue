<template>
  <div>
    <BaseLabel :title="route.meta.title ? t(route.meta.title) : route.name?.toString()" :size="16" />
    <Breadcrumb v-bind="breadcrumb" class="text-sm" />
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import type { MenuItem } from 'primevue/menuitem';

const route = useRoute();
const { t } = useI18n();

const breadcrumb: ComputedRef<{ home: MenuItem; model: MenuItem[] }> = computed(() => {
  const crumbs: MenuItem[] = [];
  route.matched.forEach(e => {
    if (e.meta.breadcrumb) {
      crumbs.push({ label: t(e.meta.breadcrumb), to: e.path, disabled: e.meta.breadcrumbDisabled ?? e.name === route.name });
    }
  });
  const home: MenuItem = crumbs.shift() ?? {};

  return { home, model: crumbs };
});

defineExpose({ breadcrumb });
</script>

<style lang="scss">
@layer components {
  nav.p-breadcrumb {
    @apply border-none bg-transparent p-0 my-1 text-xs;
  }
}
</style>
