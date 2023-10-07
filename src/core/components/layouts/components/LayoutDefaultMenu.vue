<template>
  <Menu :model="items" class="w-full pb-3 pt-0 rounded-none bg-transparent border-0" :pt="menuPassTrough" :exact="false" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import Menu, { MenuPassThroughOptions } from 'primevue/menu';
import { MenuItem } from 'primevue/menuitem';

import { FRONT_MENUS } from '@/core/constants/menus.constant';

const { t } = useI18n();
const route = useRoute();

const toast = useToast();
const items = computed<MenuItem[]>(() => [
  {
    label: t('menu.options'),
    items: [
      {
        label: t('menu.update'),
        icon: 'pi pi-refresh',
        command: () => {
          toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
        },
      },
      {
        label: t('menu.delete'),
        icon: 'pi pi-times',
        command: () => {
          toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        },
      },
    ],
  },
  // Mapping menu from constant for 2 Level menu
  ...FRONT_MENUS.map(menu => ({
    ...menu,
    label: menu.label ? t(menu.label.toString()) : menu.label,
    items: menu.items?.map(child => ({ ...child, label: child.label ? t(child.label?.toString()) : child.label })),
  })),
]);

const menuPassTrough = computed<MenuPassThroughOptions>(() => ({
  menuitem: ({ instance }) => ({
    class: route.fullPath.includes(instance?.item?.to) ? 'my-2 p-focus' : 'my-2',
  }),
  submenuHeader: { class: 'lg:shadow' },
}));

defineExpose({ items });
</script>
