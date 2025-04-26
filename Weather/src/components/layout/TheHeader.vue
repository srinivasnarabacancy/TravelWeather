<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../../store/userStore';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();
const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
  closeMobileMenu();
};
</script>

<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-primary-500">
                <path fill-rule="evenodd" d="M4.5 9.75a6 6 0 0111.573-2.226 3.75 3.75 0 014.133 4.303A4.5 4.5 0 0118 20.25H6.75a5.25 5.25 0 01-2.23-10.004 6.072 6.072 0 01-.02-.496z" clip-rule="evenodd" />
              </svg>
              <span class="font-bold text-xl text-gray-800 dark:text-white">TravelWeather</span>
            </router-link>
          </div>
          <nav class="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
            <router-link to="/" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" active-class="text-primary-600 dark:text-primary-400">
              Home
            </router-link>
            <router-link to="/weather" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" active-class="text-primary-600 dark:text-primary-400">
              Weather
            </router-link>
            <router-link to="/advisories" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" active-class="text-primary-600 dark:text-primary-400">
              Advisories
            </router-link>
            <router-link to="/events" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" active-class="text-primary-600 dark:text-primary-400">
              Events
            </router-link>
            <router-link to="/trips" class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400" active-class="text-primary-600 dark:text-primary-400">
              My Trips
            </router-link>
          </nav>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button 
            @click="userStore.toggleDarkMode" 
            class="rounded-full p-1 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <span class="sr-only">Toggle dark mode</span>
            <svg v-if="userStore.darkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
          <div class="ml-3 relative">
            <button 
              type="button"
              @click="navigateTo('/trips/new')"
              class="btn btn-primary"
            >
              New Trip
            </button>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button 
            @click="userStore.toggleDarkMode" 
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span class="sr-only">Toggle dark mode</span>
            <svg v-if="userStore.darkMode" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>
          <button 
            @click="toggleMobileMenu" 
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              v-if="!isMobileMenuOpen" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg 
              v-else 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke-width="1.5" 
              stroke="currentColor" 
              class="h-6 w-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isMobileMenuOpen" class="sm:hidden bg-white dark:bg-gray-800 shadow-md">
      <div class="pt-2 pb-3 space-y-1">
        <router-link to="/" @click="closeMobileMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400" active-class="bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400">
          Home
        </router-link>
        <router-link to="/weather" @click="closeMobileMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400" active-class="bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400">
          Weather
        </router-link>
        <router-link to="/advisories" @click="closeMobileMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400" active-class="bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400">
          Advisories
        </router-link>
        <router-link to="/events" @click="closeMobileMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400" active-class="bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400">
          Events
        </router-link>
        <router-link to="/trips" @click="closeMobileMenu" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400" active-class="bg-gray-50 dark:bg-gray-700 text-primary-600 dark:text-primary-400">
          My Trips
        </router-link>
        <button
          @click="navigateTo('/trips/new')"
          class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-primary-500 hover:bg-primary-600 transition-colors"
        >
          New Trip
        </button>
      </div>
    </div>
  </header>
</template>