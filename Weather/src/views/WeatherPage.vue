<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Weather Forecast</h1>
    <CurrentWeather />
    <ForecastList />
  </div>
</template>

<script setup lang="ts">
import CurrentWeather from '../components/weather/CurrentWeather.vue';
import ForecastList from '../components/weather/ForecastList.vue';
</script>