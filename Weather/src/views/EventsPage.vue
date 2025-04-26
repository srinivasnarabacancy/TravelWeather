<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Local Events</h1>
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-600">
      {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EventCard from '../components/events/EventCard.vue';
import eventService from '../services/eventService';
import type { Event } from '../types/event';

const events = ref<Event[]>([]);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    events.value = await eventService.getEvents({});
  } catch (err) {
    console.error('Error fetching events:', err);
    error.value = 'Failed to load events. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>