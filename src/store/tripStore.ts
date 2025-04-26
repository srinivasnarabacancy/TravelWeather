import { defineStore } from 'pinia';
import type { Trip } from '../types/travel';
import travelService from '../services/travelService';

interface TripState {
  trips: Trip[];
  currentTrip: Trip | null;
  isLoading: boolean;
  error: string | null;
}

export const useTripStore = defineStore('trip', {
  state: (): TripState => ({
    trips: [],
    currentTrip: null,
    isLoading: false,
    error: null
  }),
  
  actions: {
    async fetchTrips() {
      this.isLoading = true;
      this.error = null;
      
      try {
        this.trips = await travelService.getTrips();
      } catch (error) {
        console.error('Failed to fetch trips:', error);
        this.error = 'Failed to load trips. Please try again.';
      } finally {
        this.isLoading = false;
      }
    },
    
    async saveTrip(trip: Trip) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const savedTrip = await travelService.saveTrip(trip);
        
        // Update current trip
        this.currentTrip = savedTrip;
        
        // Update in trips array if exists, otherwise add
        const index = this.trips.findIndex(t => t.id === savedTrip.id);
        if (index >= 0) {
          this.trips[index] = savedTrip;
        } else {
          this.trips.push(savedTrip);
        }
        
        return savedTrip;
      } catch (error) {
        console.error('Failed to save trip:', error);
        this.error = 'Failed to save trip. Please try again.';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    setCurrentTrip(trip: Trip | null) {
      this.currentTrip = trip;
    },
    
    createNewTrip(): Trip {
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      
      return {
        id: '',
        name: 'New Trip',
        startDate: today.toISOString().split('T')[0],
        endDate: nextWeek.toISOString().split('T')[0],
        destination: {
          name: '',
          lat: 0,
          lon: 0,
          country: ''
        },
        travelerCount: 1,
        itinerary: []
      };
    },
    
    deleteTrip(tripId: string) {
      this.trips = this.trips.filter(trip => trip.id !== tripId);
      
      if (this.currentTrip && this.currentTrip.id === tripId) {
        this.currentTrip = null;
      }
    }
  }
});