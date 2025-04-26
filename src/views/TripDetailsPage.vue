<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="tripStore.isLoading" class="flex justify-center items-center min-h-[400px]">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>

    <div v-else-if="!trip" class="text-center py-12">
      <h2 class="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">Trip Not Found</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">The trip you're looking for doesn't exist or has been removed.</p>
      <router-link to="/trips" class="btn btn-primary">
        View All Trips
      </router-link>
    </div>

    <template v-else>
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">{{ trip.name }}</h1>
          <p class="text-gray-600 dark:text-gray-400">
            {{ trip.destination.name }}, {{ trip.destination.country }}
          </p>
        </div>
        <div class="flex gap-3">
          <router-link :to="`/trips/${trip.id}/edit`" class="btn btn-secondary">
            Edit Trip
          </router-link>
          <button @click="confirmDelete" class="btn bg-error-100 text-error-700 hover:bg-error-200">
            Delete
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="card p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Trip Details</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
                <p class="font-medium">{{ new Date(trip.startDate).toLocaleDateString() }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">End Date</p>
                <p class="font-medium">{{ new Date(trip.endDate).toLocaleDateString() }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                <p class="font-medium">{{ tripDuration }} days</p>
              </div>
              <div>
                <p class="text-sm text-gray-600 dark:text-gray-400">Travelers</p>
                <p class="font-medium">{{ trip.travelerCount }}</p>
              </div>
            </div>
          </div>

          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Itinerary</h2>
            <div v-if="trip.itinerary.length === 0" class="text-center py-8 text-gray-500">
              <p>No itinerary items added yet</p>
              <router-link :to="`/trips/${trip.id}/edit`" class="btn btn-primary mt-4">
                Add Activities
              </router-link>
            </div>
            <div v-else class="space-y-4">
              <div v-for="day in trip.itinerary" :key="day.id" class="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 class="font-semibold mb-2">Day {{ day.day }} - {{ new Date(day.date).toLocaleDateString() }}</h3>
                <div class="space-y-3">
                  <div v-for="activity in day.activities" :key="activity.id" class="flex items-start space-x-3">
                    <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                      <span class="text-sm">{{ activity.startTime || '--:--' }}</span>
                    </div>
                    <div>
                      <p class="font-medium">{{ activity.name }}</p>
                      <p v-if="activity.description" class="text-sm text-gray-600 dark:text-gray-400">
                        {{ activity.description }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="card p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">Weather Forecast</h2>
            <p class="text-gray-600 dark:text-gray-400 text-center">
              Weather forecast will be displayed here
            </p>
          </div>

          <div class="card p-6">
            <h2 class="text-xl font-bold mb-4">Travel Advisories</h2>
            <p class="text-gray-600 dark:text-gray-400 text-center">
              Travel advisories will be displayed here
            </p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTripStore } from '../store/tripStore';
import { differenceInDays } from 'date-fns';

const route = useRoute();
const router = useRouter();
const tripStore = useTripStore();

const trip = computed(() => {
  return tripStore.trips.find(t => t.id === route.params.id);
});

const tripDuration = computed(() => {
  if (!trip.value) return 0;
  return differenceInDays(
    new Date(trip.value.endDate),
    new Date(trip.value.startDate)
  ) + 1;
});

const confirmDelete = () => {
  if (confirm('Are you sure you want to delete this trip?')) {
    tripStore.deleteTrip(route.params.id as string);
    router.push('/trips');
  }
};

onMounted(async () => {
  if (tripStore.trips.length === 0) {
    await tripStore.fetchTrips();
  }
});
</script>