<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore';
import { useTripStore } from '../store/tripStore';
import LocationSearch from '../components/shared/LocationSearch.vue';
import CurrentWeather from '../components/weather/CurrentWeather.vue';
import type { Location } from '../types/weather';
import weatherService from '../services/weatherService';
import eventService from '../services/eventService';
import type { Event } from '../types/event';

const router = useRouter();
const userStore = useUserStore();
const tripStore = useTripStore();

const currentWeather = ref(null);
const isLoading = ref(false);
const featuredEvents = ref<Event[]>([]);
const error = ref('');

const currentLocation = computed(() => userStore.currentLocation);

const loadWeatherForLocation = async (location: Location) => {
  isLoading.value = true;
  error.value = '';
  
  try {
    const forecast = await weatherService.getWeatherForecast(location.lat, location.lon);
    currentWeather.value = forecast.current;
  } catch (err) {
    console.error('Error loading weather:', err);
    error.value = 'Failed to load weather data. Please try again.';
  } finally {
    isLoading.value = false;
  }
};

const loadFeaturedEvents = async () => {
  try {
    const events = await eventService.getEvents({
      isFree: undefined,
      sortBy: 'popularity'
    });
    
    featuredEvents.value = events.filter(event => event.isFeatured).slice(0, 3);
  } catch (err) {
    console.error('Error loading events:', err);
  }
};

onMounted(async () => {
  await tripStore.fetchTrips();
  await loadFeaturedEvents();
  
  // Try to load weather for current location if available
  if (currentLocation.value) {
    loadWeatherForLocation(currentLocation.value);
  }
});

const onLocationSelect = (location: Location) => {
  loadWeatherForLocation(location);
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl p-8 md:p-12 mb-8 shadow-lg">
      <div class="max-w-3xl">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">Plan Your Perfect Trip with Real-Time Weather</h1>
        <p class="text-lg md:text-xl opacity-90 mb-6">Travel confidently with accurate weather forecasts, local events, and personalized trip planning.</p>
        
        <div class="max-w-lg">
          <LocationSearch 
            placeholder="Search for a city..." 
            @select="onLocationSelect"
          />
        </div>
      </div>
    </section>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <section class="lg:col-span-2">
        <h2 class="text-2xl font-bold mb-4">Weather Updates</h2>
        
        <div v-if="isLoading" class="card p-8 flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
        
        <div v-else-if="error" class="card p-8 text-center h-64 flex flex-col justify-center items-center">
          <p class="text-error-500 mb-4">{{ error }}</p>
          <p>Search for a location to see weather updates.</p>
        </div>
        
        <div v-else-if="currentWeather && currentLocation" class="animate-fade-in">
          <CurrentWeather 
            :weather="currentWeather" 
            :city="currentLocation.name" 
            :country="currentLocation.country" 
          />
        </div>
        
        <div v-else class="card p-8 text-center h-64 flex flex-col justify-center items-center">
          <p class="text-xl mb-4">Search for a location to see weather updates</p>
          <p class="text-gray-500 dark:text-gray-400">Get real-time weather data for any city around the world</p>
        </div>
      </section>
      
      <section>
        <h2 class="text-2xl font-bold mb-4">Travel Planning</h2>
        <div class="card p-6 mb-4">
          <h3 class="text-lg font-semibold mb-3">Quick Links</h3>
          <div class="grid grid-cols-2 gap-4">
            <router-link to="/weather" class="btn bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm flex flex-col items-center justify-center p-4 h-24 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
              </svg>
              Weather Forecast
            </router-link>
            <router-link to="/advisories" class="btn bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 text-sm flex flex-col items-center justify-center p-4 h-24 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              Travel Advisories
            </router-link>
            <router-link to="/events" class="btn bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm flex flex-col items-center justify-center p-4 h-24 rounded-lg hover:bg-green-100 dark:hover:bg-green-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Local Events
            </router-link>
            <router-link to="/trips" class="btn bg-purple-50 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm flex flex-col items-center justify-center p-4 h-24 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 mb-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              Trip Planner
            </router-link>
          </div>
        </div>
        
        <div class="card p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">My Trips</h3>
            <router-link to="/trips/new" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
              + New Trip
            </router-link>
          </div>
          
          <div v-if="tripStore.isLoading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
          
          <div v-else-if="tripStore.trips.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            <p>No trips planned yet.</p>
            <router-link to="/trips/new" class="btn btn-primary mt-4 inline-block">
              Create Your First Trip
            </router-link>
          </div>
          
          <div v-else class="space-y-4">
            <div v-for="trip in tripStore.trips.slice(0, 3)" :key="trip.id" class="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-3 last:pb-0">
              <router-link :to="`/trips/${trip.id}`" class="block hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 p-2 rounded-lg transition-colors">
                <h4 class="font-medium">{{ trip.name }}</h4>
                <div class="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{{ trip.destination.name }}</span>
                  <span>{{ new Date(trip.startDate).toLocaleDateString() }}</span>
                </div>
              </router-link>
            </div>
            
            <router-link v-if="tripStore.trips.length > 3" to="/trips" class="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 block text-center pt-2">
              View All Trips
            </router-link>
          </div>
        </div>
      </section>
    </div>
    
    <section class="mt-12">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Featured Events</h2>
        <router-link to="/events" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
          View All Events →
        </router-link>
      </div>
      
      <div v-if="featuredEvents.length === 0" class="card p-8 text-center">
        <p>No featured events at this time.</p>
      </div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
        <div v-for="event in featuredEvents" :key="event.id" class="card card-hover h-full">
          <img 
            :src="event.imageUrl || 'https://picsum.photos/seed/event/500/300'" 
            alt="Event image" 
            class="w-full h-48 object-cover rounded-t-xl"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold mb-1">{{ event.name }}</h3>
            <div class="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span>{{ new Date(event.startDate).toLocaleDateString() }}</span>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">{{ event.description }}</p>
            
            <router-link :to="`/events?id=${event.id}`" class="btn btn-primary block text-center">
              View Details
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>