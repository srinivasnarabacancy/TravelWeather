<script setup lang="ts">
import { computed } from 'vue';
import type { Advisory } from '../../types/travel';

const props = defineProps<{
  advisory: Advisory;
}>();

const riskColor = computed(() => {
  switch (props.advisory.score) {
    case 1: return 'bg-success-100 border-success-500 text-success-800 dark:bg-success-900 dark:border-success-600 dark:text-success-200';
    case 2: return 'bg-warning-100 border-warning-500 text-warning-800 dark:bg-warning-900 dark:border-warning-600 dark:text-warning-200';
    case 3: return 'bg-accent-100 border-accent-500 text-accent-800 dark:bg-accent-900 dark:border-accent-600 dark:text-accent-200';
    case 4: return 'bg-error-100 border-error-500 text-error-800 dark:bg-error-900 dark:border-error-600 dark:text-error-200';
    case 5: return 'bg-error-200 border-error-600 text-error-900 dark:bg-error-950 dark:border-error-700 dark:text-error-100';
    default: return 'bg-gray-100 border-gray-500 text-gray-800 dark:bg-gray-900 dark:border-gray-600 dark:text-gray-200';
  }
});

const riskText = computed(() => {
  switch (props.advisory.score) {
    case 1: return 'Low Risk';
    case 2: return 'Some Risk';
    case 3: return 'Medium Risk';
    case 4: return 'High Risk';
    case 5: return 'Extreme Risk';
    default: return 'Unknown Risk';
  }
});

const iconForCategory = (category: string) => {
  switch (category) {
    case 'safety':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>`;
    case 'health':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>`;
    case 'transportation':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>`;
    case 'weather':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>`;
    case 'political':
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" /></svg>`;
    default:
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>`;
  }
};

const levelColor = (level: string) => {
  switch (level) {
    case 'low': return 'text-success-600 dark:text-success-400';
    case 'medium': return 'text-warning-600 dark:text-warning-400';
    case 'high': return 'text-accent-600 dark:text-accent-400';
    case 'extreme': return 'text-error-600 dark:text-error-400';
    default: return 'text-gray-600 dark:text-gray-400';
  }
};
</script>

<template>
  <div class="card overflow-hidden">
    <div :class="['px-4 py-3 border-l-4', riskColor]">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">{{ advisory.country }}</h3>
        <span class="text-sm font-medium">{{ riskText }}</span>
      </div>
      <p class="mt-1">{{ advisory.message }}</p>
      <p class="text-xs mt-2 text-gray-500 dark:text-gray-400">
        Last updated: {{ new Date(advisory.lastUpdated).toLocaleDateString() }}
      </p>
    </div>
    
    <div class="p-4">
      <h4 class="font-medium mb-2">Advisory Details</h4>
      <div class="space-y-3">
        <div v-for="detail in advisory.details" :key="`${detail.category}-${detail.level}`" class="flex items-start space-x-3">
          <div :class="['mt-0.5', levelColor(detail.level)]" v-html="iconForCategory(detail.category)"></div>
          <div>
            <div class="flex items-center space-x-2">
              <p class="font-medium capitalize">{{ detail.category }}</p>
              <span :class="['text-xs px-2 py-0.5 rounded-full', levelColor(detail.level)]">{{ detail.level }}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-300">{{ detail.description }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-xs">
      Source: {{ advisory.source }}
    </div>
  </div>
</template>