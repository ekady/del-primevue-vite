<template>
  <div class="grid grid-cols-5 h-full">
    <div class="h-full bg-slate-300 p-3">test</div>
    <div class="col-span-4 h-full">
      <AppLayoutDefaultHeader />
      <main class="p-3">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLayoutDefaultHeader from './components/AppLayoutDefaultHeader.vue';
</script>
