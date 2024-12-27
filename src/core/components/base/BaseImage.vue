<script lang="ts" setup>
import { computed } from 'vue';

export interface Props {
  icon?: string;
  image?: string;
  height?: string;
  width?: string;
  isIcon?: boolean;
  isImage?: boolean;
  isPng?: boolean;
  isSvg?: boolean;
  isJpg?: boolean;
  isCursor?: boolean;
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'default',
  image: 'default',
  height: '100%',
  width: '100%',
  isIcon: false,
  isImage: false,
  isPng: false,
  isSvg: false,
  isJpg: false,
  alt: '',
});

/**
 * @description Set the image source
 *
 * @return {string}
 */
const sourceImage = computed(() => {
  if (props.isIcon) {
    if (props.isJpg) {
      return require(`@/core/assets/icons/${props.icon}.svg`);
    } else if (props.isPng) {
      return require(`@/core/assets/icons/${props.icon}.png`);
    } else {
      return require(`@/core/assets/icons/${props.icon}.svg`);
    }
  } else if (props.isImage) {
    if (props.isJpg) {
      return require(`@/modules/assets/images/${props.image}.jpg`);
    } else if (props.isPng) {
      return require(`@/modules/assets/images/${props.image}.png`);
    } else {
      return require(`@/modules/assets/images/${props.image}.svg`);
    }
  }
});

/**
 * @description Define style for base image
 *
 * @return {object}
 */
const styleBaseImage = computed(() => {
  return {
    height: props.height,
    width: props.width,
  };
});

/**
 * @description Define class for base image
 *
 * @return {object}
 */
const classBaseImage = {
  'cursor-pointer': props.isCursor,
};

defineExpose({ sourceImage, styleBaseImage, classBaseImage });
</script>

<template>
  <img :src="sourceImage" :style="styleBaseImage" :class="classBaseImage" :alt="alt">
</template>
