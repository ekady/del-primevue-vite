<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem';
import { computed, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

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

<template>
  <div>
    <BaseLabel :title="route.meta.title ? t(route.meta.title) as string : route.name as string" :size="16" />
    <Breadcrumb v-bind="breadcrumb" class="text-sm" />
  </div>
</template>

<style lang="scss">
@layer components {
  nav.p-breadcrumb {
    @apply border-none bg-transparent p-0 my-1 text-xs;
  }
}
</style>
