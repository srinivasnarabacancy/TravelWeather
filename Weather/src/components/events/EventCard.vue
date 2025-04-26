<script setup lang="ts">
import { computed } from 'vue';
import type { Event } from '../../types/event';
import { format, parseISO } from 'date-fns';

const props = defineProps<{
  event: Event;
}>();

const formattedDate = computed(() => {
  const start = parseISO(props.event.startDate);
  
  if (props.event.endDate) {
    const end = parseISO(props.event.endDate);
    if (props.event.startDate === props.event.endDate) {
      return format(start, 'MMMM d, yyyy');
    }
    return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`;
  }
  
  return format(start, 'MMMM d, yyyy');
});

const categoryColor = computed(() => {
  switch (props.event.category) {
    case 'music': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
    case 'food': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
    case 'arts': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'sports': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'outdoors': return 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200';
    case 'festivals': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
    case 'nightlife': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
    case 'family': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'business': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
});

const formattedPrice = computed(() => {
  if (!props.event.price) return 'Price not available';
  if (props.event.price.isFree) return 'Free';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.event.price.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(props.event.price.value);
});
</script>

<template>
  <div class="card card-hover transition-all duration-300 h-full flex flex-col">
    <div class="relative">
      <img 
        :src="event.imageUrl || 'https://picsum.photos/seed/event/500/300'" 
        alt="Event image" 
        class="w-full h-48 object-cover"
      />
      <div class="absolute top-2 right-2">
        <span :class="['text-xs font-medium px-2 py-1 rounded-full', categoryColor]">
          {{ event.category }}
        </span>
      </div>
      <div v-if="event.isFeatured" class="absolute top-2 left-2">
        <span class="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full">
          Featured
        </span>
      </div>
    </div>
    
    <div class="p-4 flex-grow flex flex-col">
      <h3 class="text-lg font-bold mb-1">{{ event.name }}</h3>
      
      <div class="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
        <span>{{ formattedDate }}</span>
      </div>
      
      <div class="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        <span>{{ event.location.name }}</span>
      </div>
      
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">{{ event.description }}</p>
      
      <div class="mt-auto flex items-center justify-between">
        <span class="font-semibold">{{ formattedPrice }}</span>
        
        <div class="flex items-center space-x-2">
          <span v-if="event.rating" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-yellow-500">
              <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
            </svg>
            <span class="text-xs font-medium ml-1">{{ event.rating.toFixed(1) }}</span>
          </span>
          
          <span v-if="event.attendingCount" class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <span class="text-xs font-medium ml-1">{{ event.attendingCount }}</span>
          </span>
        </div>
      </div>
    </div>
    
    <a v-if="event.url" :href="event.url" target="_blank" rel="noopener noreferrer" class="block bg-gray-50 dark:bg-gray-800 px-4 py-3 text-center text-primary-600 dark:text-primary-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      Visit Event Website
    </a>
  </div>
</template>