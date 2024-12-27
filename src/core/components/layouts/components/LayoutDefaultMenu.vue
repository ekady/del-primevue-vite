<script lang="ts" setup>
import type { MenuPassThroughOptions } from 'primevue/menu';
import Menu from 'primevue/menu';
import type { MenuItem } from 'primevue/menuitem';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { FRONT_MENUS } from '@/core/constants/menus.constant';

const { t } = useI18n();
const route = useRoute();

const items = computed<MenuItem[]>(() => [
  // Mapping menu from constant for 2 Level menu
  ...FRONT_MENUS.map(menu => ({
    ...menu,
    label: menu.label ? t(menu.label.toString()) : menu.label,
    items: menu.items?.map(child => ({ ...child, label: child.label ? t(child.label?.toString()) : child.label })),
  })),
]);

const menuPassTrough = computed<MenuPassThroughOptions>(() => ({
  item: ({ instance }) => ({
    class: route.fullPath.includes(instance?.item?.to) ? 'my-2 p-focus' : 'my-2',
  }),
  submenuLabel: { class: 'lg:shadow' },
}));

defineExpose({ items });
</script>

<template>
  <Menu :model="items" class="w-full pb-3 pt-0 rounded-none bg-transparent border-0" :pt="menuPassTrough" :exact="false">
    <template #item="{ item, props }">
      <RouterLink v-if="item.to" :to="item.to" v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </RouterLink>
      <a v-else v-ripple v-bind="props.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
      </a>
    </template>
  </Menu>
</template>
