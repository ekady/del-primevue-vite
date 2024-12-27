<script lang="ts" setup>
import { useTheme } from '@/core/composables/useTheme';

const { theme_isDark } = useTheme();
</script>

<template>
  <Card
    class="shadow-none border border-solid"
    :class="{ 'border-slate-800': theme_isDark, 'border-slate-200': !theme_isDark }"
    :pt="{ content: { class: 'py-0' } }"
  >
    <template #content>
      <div class="flex flex-col items-start justify-between gap-4">
        <BaseLabel title="Filter" :size="16" />
        <div class="filter-items flex items-center gap-1 w-full">
          <slot />
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
@layer components {
  filter {
    &-items {
      &:first-child {
        @apply grow;
      }
    }
  }
}
</style>
