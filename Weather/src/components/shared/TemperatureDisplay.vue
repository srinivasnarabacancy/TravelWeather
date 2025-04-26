<script setup lang="ts">
import { computed } from 'vue';
import { useUserStore } from '../../store/userStore';

const props = defineProps<{
  celsius: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showUnit?: boolean;
}>();

const userStore = useUserStore();

const temperature = computed(() => {
  if (userStore.temperatureUnit === 'fahrenheit') {
    return (props.celsius * 9/5) + 32;
  }
  return props.celsius;
});

const unit = computed(() => {
  return userStore.temperatureUnit === 'celsius' ? '°C' : '°F';
});

const textSize = computed(() => {
  switch (props.size || 'md') {
    case 'sm': return 'text-sm';
    case 'md': return 'text-xl';
    case 'lg': return 'text-3xl';
    case 'xl': return 'text-5xl';
    default: return 'text-xl';
  }
});
</script>

<template>
  <span :class="['font-semibold', textSize]">
    {{ Math.round(temperature) }}<span v-if="showUnit !== false">{{ unit }}</span>
  </span>
</template>