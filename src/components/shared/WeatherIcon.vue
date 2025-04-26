<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  code: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}>();

const iconSize = computed(() => {
  switch (props.size || 'md') {
    case 'sm': return 'w-6 h-6';
    case 'md': return 'w-10 h-10';
    case 'lg': return 'w-16 h-16';
    case 'xl': return 'w-24 h-24';
    default: return 'w-10 h-10';
  }
});

const iconUrl = computed(() => {
  return `https://openweathermap.org/img/wn/${props.code}@2x.png`;
});
</script>

<template>
  <div :class="['inline-flex items-center justify-center', iconSize]">
    <img :src="iconUrl" :alt="code" :class="iconSize" />
  </div>
</template>