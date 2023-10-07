<template>
  <div class="h-full grid grid-cols-1 sm:grid-cols-2 items-center">
    <div class="auth-block items-center hidden sm:flex" :style="rightStyle" />
    <div class="auth-block justify-center flex-col gap-1">
      <RouterView />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { HTMLAttributes } from 'vue';

import bgAuth from '@/core/assets/img/bg-login.jpg';

const rightStyle: HTMLAttributes['style'] = {
  backgroundImage: `url(${bgAuth})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};
</script>

<style lang="scss">
@layer components {
  .auth-block {
    @apply h-full flex p-4;
  }
}

.p-divider::before {
  border-top: 1px solid black !important;
}
</style>
