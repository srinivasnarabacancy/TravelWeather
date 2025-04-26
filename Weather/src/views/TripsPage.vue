<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">My Trips</h1>
      <router-link to="/trips/new" class="btn btn-primary">
        + New Trip
      </router-link>
    </div>
    
    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-600">
      {{ error }}
    </div>
    <div v-else-if="trips.length === 0" class="text-center py-8">
      <p class="text-gray-600 mb-4">You haven't created any trips yet.</p>
      <router-link to="/trips/new" class="btn btn-primary">
        Create Your First Trip
      </router-link>
    </div>
    <div v-else class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="trip in trips" :key="trip.id" class="card p-6">
        <h3 class="text-xl font-semibold mb-2">{{ trip.name }}</h3>
        <p class="text-gray-600 mb-4">{{ trip.destination.name }}</p>
        <div class="flex justify-between text-sm text-gray-500">
          <span>{{ new Date(trip.startDate).toLocaleDateString() }}</span>
          <span>{{ trip.travelerCount }} travelers</span>
        </div>
        <div class="mt-4">
          <router-link :to="`/trips/${trip.id}`" class="btn btn-primary w-full">
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import travelService from '../services/travelService';
import type { Trip } from '../types/travel';

const trips = ref<Trip[]>([]);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    trips.value = await travelService.getTrips();
  } catch (err) {
    console.error('Error fetching trips:', err);
    error.value = 'Failed to load trips. Please try again later.';
  } finally {
    loading.value = false;
  }
});
</script>