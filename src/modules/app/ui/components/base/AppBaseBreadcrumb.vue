<template>
  <div>
    <AppBaseLabel :title="route.meta.title ? t(route.meta.title) : route.name" />
    <Breadcrumb v-bind="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { MenuItem } from 'primevue/menuitem';

const route = useRoute();
const { t } = useI18n();

const breadcrumb: ComputedRef<{ home: MenuItem; crumbs: MenuItem[] }> = computed(() => {
  const crumbs: MenuItem[] = [];
  route.matched.forEach(e => {
    if (e.meta.breadcrumb) {
      crumbs.push({ label: t(e.meta.breadcrumb), to: e.path, disabled: e.meta.breadcrumbDisabled || e.path === route.path });
    }
  });
  const home: MenuItem = crumbs.shift() || {};

  return { home, crumbs };
});
</script>

<style lang="scss">
@layer components {
  .p-breadcrumb {
    @apply border-none bg-transparent p-0 my-1 text-xs;
  }
}
</style>
