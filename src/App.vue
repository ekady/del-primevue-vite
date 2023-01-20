<template>
  <component :is="layout" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const layout = computed(() => {
  return (route.meta.layout ?? 'empty') + '-layout';
});
</script>
