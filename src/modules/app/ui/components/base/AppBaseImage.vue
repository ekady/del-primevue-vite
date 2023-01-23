<template>
  <img :src="sourceImage" :style="styleBaseImage" :class="classBaseImage" :alt="isIcon ? icon : image" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

export interface Props {
  icon?: string;
  image?: string;
  height?: string;
  width?: string;
  isIcon?: boolean;
  isCursor?: boolean;
  extension?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'default',
  image: 'default',
  height: 'auto',
  width: 'auto',
  isIcon: false,
  isCursor: false,
});

const sourceImage = computed(() => {
  if (props.isIcon) return require(`@/modules/app/assets/icons/${props.icon}.svg`);

  const extension = props.extension ? `.${props.extension}` : '.png';
  return require(`@/modules/assets/images/${props.image}${extension}`);
});

const styleBaseImage = computed(() => {
  return {
    height: props.height,
    width: props.width,
  };
});

const classBaseImage = computed(() => {
  return {
    'cursor-pointer': props.isCursor,
  };
});
</script>
