<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">
      {{ isEditing ? 'Edit Trip' : 'Create New Trip' }}
    </h1>
    <div class="bg-white rounded-lg shadow p-6">
      <!-- Placeholder for trip edit form -->
      <p class="text-gray-600">Trip edit form will be implemented here</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isEditing = computed(() => route.params.id !== undefined);
</script>