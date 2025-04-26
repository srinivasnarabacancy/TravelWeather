<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Travel Advisories</h1>
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-600">
      {{ error }}
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AdvisoryCard v-for="advisory in advisories" 
                    :key="advisory.id" 
                    :advisory="advisory" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdvisoryCard from '../components/travel/AdvisoryCard.vue';
import travelService from '../services/travelService';
import type { Advisory } from '../types/travel';

const advisories = ref<Advisory[]>([]);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    advisories.value = await travelService.getAdvisories('ALL');
  } catch (err) {
    console.error('Failed to fetch travel advisories:', err);
    error.value = 'Failed to load travel advisories. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>