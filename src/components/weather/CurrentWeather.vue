<script setup lang="ts">
import { computed } from 'vue';
import type { CurrentWeather as CurrentWeatherType } from '../../types/weather';
import WeatherIcon from '../shared/WeatherIcon.vue';
import TemperatureDisplay from '../shared/TemperatureDisplay.vue';
import { format } from 'date-fns';

const props = defineProps<{
  weather: CurrentWeatherType;
  city: string;
  country: string;
}>();

const weatherCondition = computed(() => {
  return props.weather?.weather?.[0] ?? { id: 0, icon: '', description: 'No weather data' };
});

const formattedDate = computed(() => {
  return props.weather?.dt ? format(new Date(props.weather.dt * 1000), 'EEEE, MMMM d') : format(new Date(), 'EEEE, MMMM d');
});

const weatherAnimation = computed(() => {
  const weatherId = weatherCondition.value.id;
  
  // Thunderstorm
  if (weatherId >= 200 && weatherId < 300) {
    return 'animate-pulse-slow text-yellow-400 dark:text-yellow-300';
  }
  // Drizzle or Rain
  else if ((weatherId >= 300 && weatherId < 400) || (weatherId >= 500 && weatherId < 600)) {
    return 'animate-bounce-slow text-blue-400 dark:text-blue-300';
  }
  // Snow
  else if (weatherId >= 600 && weatherId < 700) {
    return 'animate-float text-blue-200 dark:text-blue-100';
  }
  // Clear
  else if (weatherId === 800) {
    return 'animate-float text-yellow-500 dark:text-yellow-400';
  }
  // Clouds
  else if (weatherId > 800) {
    return 'animate-float text-gray-400 dark:text-gray-300';
  }
  
  return '';
});
</script>

<template>
  <div class="card p-6 text-center">
    <h2 class="text-2xl font-bold mb-1">{{ city }}, {{ country }}</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">{{ formattedDate }}</p>
    
    <div class="flex flex-col items-center justify-center mb-4">
      <div :class="['mb-2', weatherAnimation]">
        <WeatherIcon :code="weatherCondition.icon" size="xl" />
      </div>
      <TemperatureDisplay v-if="weather?.temp" :celsius="weather.temp" size="xl" :showUnit="true" />
      <p class="text-lg capitalize mt-1">{{ weatherCondition.description }}</p>
    </div>
    
    <div v-if="weather" class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
        <TemperatureDisplay :celsius="weather.feels_like" size="md" />
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
        <p class="text-xl font-semibold">{{ weather.humidity }}%</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">Wind</p>
        <p class="text-xl font-semibold">{{ Math.round(weather.wind_speed) }} m/s</p>
      </div>
      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">UV Index</p>
        <p class="text-xl font-semibold">{{ Math.round(weather.uvi) }}</p>
      </div>
    </div>
  </div>
</template>