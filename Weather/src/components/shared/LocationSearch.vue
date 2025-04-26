<script setup lang="ts">
import { ref, watch } from 'vue';
import { useUserStore } from '../../store/userStore';
import weatherService from '../../services/weatherService';
import type { Location } from '../../types/weather';

const props = defineProps<{
  placeholder?: string;
}>();

const emit = defineEmits<{
  (e: 'select', location: Location): void
}>();

const userStore = useUserStore();
const searchQuery = ref('');
const searchResults = ref<Location[]>([]);
const isLoading = ref(false);
const showResults = ref(false);

const search = async () => {
  if (searchQuery.value.length < 2) {
    searchResults.value = [];
    return;
  }
  
  isLoading.value = true;
  try {
    searchResults.value = await weatherService.searchLocations(searchQuery.value);
  } catch (error) {
    console.error('Error searching locations:', error);
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = (() => {
  let timeout: number | null = null;
  return () => {
    if (timeout) window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      search();
    }, 300);
  };
})();

watch(searchQuery, () => {
  debouncedSearch();
});

const selectLocation = (location: Location) => {
  searchQuery.value = location.name;
  showResults.value = false;
  emit('select', location);
  userStore.setCurrentLocation(location);
};

const isFavorite = (location: Location) => {
  return userStore.favoriteLocations.some(
    favLocation => favLocation.lat === location.lat && favLocation.lon === location.lon
  );
};

const toggleFavorite = (location: Location, event: Event) => {
  event.stopPropagation();
  userStore.toggleFavoriteLocation(location);
};
</script>

<template>
  <div class="relative w-full">
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        :placeholder="placeholder || 'Search for a location...'"
        class="w-full px-4 py-2 rounded-lg border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
        @focus="showResults = true"
        @blur="setTimeout(() => { showResults = false }, 200)"
      />
      <div v-if="isLoading" class="absolute right-3 top-2.5">
        <div class="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    </div>
    
    <div v-if="showResults && (searchResults.length > 0 || userStore.recentSearches.length > 0)" 
         class="absolute z-10 mt-1 w-full rounded-md bg-white dark:bg-gray-800 shadow-lg max-h-60 overflow-auto border border-gray-200 dark:border-gray-700">
      <div v-if="searchResults.length > 0">
        <div class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
          Search Results
        </div>
        <ul>
          <li 
            v-for="location in searchResults" 
            :key="`search-${location.lat}-${location.lon}`"
            @click="selectLocation(location)"
            class="px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div>
              <div class="font-medium">{{ location.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ location.state ? `${location.state}, ` : '' }}{{ location.country }}
              </div>
            </div>
            <button 
              @click="toggleFavorite(location, $event)" 
              class="text-gray-400 hover:text-yellow-500 dark:text-gray-600 dark:hover:text-yellow-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" :class="{ 'fill-yellow-500 text-yellow-500': isFavorite(location) }">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      
      <div v-if="userStore.recentSearches.length > 0">
        <div class="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">
          Recent Searches
        </div>
        <ul>
          <li 
            v-for="location in userStore.recentSearches" 
            :key="`recent-${location.lat}-${location.lon}`"
            @click="selectLocation(location)"
            class="px-4 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          >
            <div>
              <div class="font-medium">{{ location.name }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ location.state ? `${location.state}, ` : '' }}{{ location.country }}
              </div>
            </div>
            <button 
              @click="toggleFavorite(location, $event)" 
              class="text-gray-400 hover:text-yellow-500 dark:text-gray-600 dark:hover:text-yellow-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5" :class="{ 'fill-yellow-500 text-yellow-500': isFavorite(location) }">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>