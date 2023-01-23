<template>
  <div class="flex h-full">
    <div class="h-full bg-slate-300 p-3 hidden lg:block" style="min-width: 275px">
      <PanelMenu :model="items" />
    </div>
    <Sidebar v-model:visible="visibleSidebar" position="left">
      <PanelMenu :model="items" />
    </Sidebar>

    <div class="col-span-4 h-full w-full">
      <AppLayoutDefaultHeader @change="toggleSidebar" />
      <main class="p-3">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppLayoutDefaultHeader from './components/AppLayoutDefaultHeader.vue';
import { MenuItem } from 'primevue/menuitem';

const visibleSidebar = ref<boolean>(false);

const toggleSidebar = () => {
  visibleSidebar.value = !visibleSidebar.value;
};

const route = useRoute();

const items = ref<MenuItem[]>([
  {
    label: 'Todos',
    icon: 'pi pi-envelope',
    to: { name: 'todos' },
  },
  {
    label: 'Menu',
    icon: 'pi pi-fw pi-file',
    items: [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-bookmark',
        to: { name: 'login' },
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
@layer components {
  :deep(.p-panelmenu-panel .p-panelmenu-header .p-panelmenu-header-content) {
    @apply border-none p-0 my-1 text-xs;
  }

  :deep(.p-panelmenu-content) {
    @apply border-none bg-transparent text-xs;
  }

  :deep(.p-panelmenu-content .p-menuitem > .p-menuitem-content) {
    @apply bg-white;
    > .p-menuitem-link.router-link-active {
      @apply bg-cyan-50;
    }

    > span.p-menuitem-icon,
    > span.p-menuitem-text {
      @apply text-cyan-600;
    }
  }

  :deep(.p-panelmenu-header-action.router-link-active) {
    @apply bg-cyan-50;

    > span.p-menuitem-icon,
    > span.p-menuitem-text {
      @apply text-cyan-600;
    }
  }
}
</style>
