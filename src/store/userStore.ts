import { defineStore } from 'pinia';
import type { Location } from '../types/weather';

interface UserState {
  darkMode: boolean;
  favoriteLocations: Location[];
  currentLocation: Location | null;
  temperatureUnit: 'celsius' | 'fahrenheit';
  recentSearches: Location[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    favoriteLocations: [],
    currentLocation: null,
    temperatureUnit: 'celsius',
    recentSearches: []
  }),
  
  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      
      if (this.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    
    setCurrentLocation(location: Location) {
      this.currentLocation = location;
      this.addRecentSearch(location);
    },
    
    addFavoriteLocation(location: Location) {
      const exists = this.favoriteLocations.some(loc => 
        loc.lat === location.lat && loc.lon === location.lon
      );
      
      if (!exists) {
        this.favoriteLocations.push({
          ...location,
          isFavorite: true
        });
      }
    },
    
    removeFavoriteLocation(location: Location) {
      this.favoriteLocations = this.favoriteLocations.filter(loc => 
        !(loc.lat === location.lat && loc.lon === location.lon)
      );
    },
    
    toggleFavoriteLocation(location: Location) {
      const exists = this.favoriteLocations.some(loc => 
        loc.lat === location.lat && loc.lon === location.lon
      );
      
      if (exists) {
        this.removeFavoriteLocation(location);
      } else {
        this.addFavoriteLocation(location);
      }
    },
    
    setTemperatureUnit(unit: 'celsius' | 'fahrenheit') {
      this.temperatureUnit = unit;
    },
    
    addRecentSearch(location: Location) {
      // Remove if already exists
      this.recentSearches = this.recentSearches.filter(loc => 
        !(loc.lat === location.lat && loc.lon === location.lon)
      );
      
      // Add to beginning
      this.recentSearches.unshift(location);
      
      // Keep only last 5
      if (this.recentSearches.length > 5) {
        this.recentSearches = this.recentSearches.slice(0, 5);
      }
    },
    
    clearRecentSearches() {
      this.recentSearches = [];
    }
  },
  
  persist: {
    storage: localStorage
  }
});