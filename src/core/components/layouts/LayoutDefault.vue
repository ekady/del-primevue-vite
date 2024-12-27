<script setup lang="ts">
import type { SidebarPassThroughOptions } from 'primevue/sidebar';
import { computed, ref } from 'vue';

import { useTheme } from '@/core/composables/useTheme';
import { SIDEBAR_WIDTH } from '@/core/constants/layout.constant';

import LayoutDefaultHeader from './components/LayoutDefaultHeader.vue';
import LayoutDefaultMenu from './components/LayoutDefaultMenu.vue';

const visible = ref(false);
function toggleSidebar() {
  visible.value = !visible.value;
}

const sidebarPassthrough = computed<SidebarPassThroughOptions>(() => ({
  header: { class: '!py-3 !px-4' },
  headerContent: { class: 'w-full' },
  content: { class: '!px-0' },
}));

const widthStyle = computed<{ width: string }>(() => ({ width: SIDEBAR_WIDTH }));

const { theme_isDark } = useTheme();
</script>

<template>
  <div class="relative min-h-full flex">
    <!-- Navbar -->
    <div
      class="hidden lg:block min-h-full grow shrink-0 border-0 border-r border-solid"
      :class="{ 'border-slate-800': theme_isDark, 'border-slate-300': !theme_isDark }"
      :style="widthStyle"
    >
      <div class="px-3 py-4 flex items-center gap-1">
        <span class="pi pi-prime text-xl text-sky-600" />
        <p class="text-xl text-sky-600 font-bold">
          Logo
        </p>
      </div>
      <LayoutDefaultMenu />
    </div>
    <!-- Navbar Drawer -->
    <div class="block lg:hidden">
      <Sidebar v-model:visible="visible" :show-close-icon="false" :pt="sidebarPassthrough" :style="widthStyle">
        <div>
          <Divider class="my-0" />
          <LayoutDefaultMenu />
        </div>

        <template #header>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-1">
              <span class="pi pi-prime text-xl text-sky-600" />
              <p class="text-xl text-sky-600 font-bold">
                Logo
              </p>
            </div>
            <span class="pi pi-times text-sm cursor-pointer hover:text-blue-500" @click="toggleSidebar" />
          </div>
        </template>
      </Sidebar>
    </div>

    <div class="min-h-full w-full">
      <LayoutDefaultHeader @toggle="toggleSidebar" />
      <main class="p-4">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.p-divider::before {
  border-color: #dadada !important;
}
</style>
