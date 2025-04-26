<script setup lang="ts">
import { computed } from 'vue';
import type { DailyForecast } from '../../types/weather';
import WeatherIcon from '../shared/WeatherIcon.vue';
import TemperatureDisplay from '../shared/TemperatureDisplay.vue';
import { format } from 'date-fns';

const props = defineProps<{
  forecast: DailyForecast[];
  days?: number;
}>;

const visibleForecast = computed(() => {
  return props.forecast.slice(0, props.days || 7);
});
</script>

<template>
  <div class="card p-4">
    <h3 class="text-xl font-bold mb-4">7-Day Forecast</h3>
    <div class="grid gap-y-4">
      <div v-for="day in visibleForecast" :key="day.dt" class="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700 last:border-0">
        <div class="w-24">
          <p class="font-medium">{{ format(new Date(day.dt * 1000), 'EEE, MMM d') }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <WeatherIcon :code="day.weather[0].icon" size="sm" />
          <span class="text-sm hidden sm:inline">{{ day.weather[0].description }}</span>
        </div>
        <div class="flex space-x-4">
          <div class="text-right">
            <span class="text-xs text-gray-500 dark:text-gray-400">High</span>
            <div>
              <TemperatureDisplay :celsius="day.temp.max" size="sm" />
            </div>
          </div>
          <div class="text-right">
            <span class="text-xs text-gray-500 dark:text-gray-400">Low</span>
            <div>
              <TemperatureDisplay :celsius="day.temp.min" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>