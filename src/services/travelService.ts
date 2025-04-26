import axios from 'axios';
import type { Advisory, Trip, ItineraryItem } from '../types/travel';
import { format, addDays } from 'date-fns';

// Note: In a real app, you would store this in an environment variable
const TRAVEL_API_KEY = 'YOUR_TRAVEL_API_KEY';
const TRAVEL_API_URL = 'https://api.example.com/travel';

export const travelService = {
  async getAdvisories(countryCode: string): Promise<Advisory[]> {
    try {
      const response = await axios.get(`${TRAVEL_API_URL}/advisories`, {
        params: {
          countryCode,
          apiKey: TRAVEL_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching travel advisories:', error);
      throw error;
    }
  },

  async saveTrip(trip: Trip): Promise<Trip> {
    try {
      // In a real app, this would save to a backend server
      const response = await axios.post(`${TRAVEL_API_URL}/trips`, trip, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TRAVEL_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error saving trip:', error);
      throw error;
    }
  },

  async getTrips(): Promise<Trip[]> {
    try {
      // In a real app, this would fetch from a backend server
      const response = await axios.get(`${TRAVEL_API_URL}/trips`, {
        headers: {
          'Authorization': `Bearer ${TRAVEL_API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trips:', error);
      throw error;
    }
  }
};

// Mock service for development
export const mockTravelService = {
  async getAdvisories(countryCode: string): Promise<Advisory[]> {
    // Mock advisories for development
    const mockAdvisories: Advisory[] = [
      {
        id: '1',
        country: 'France',
        countryCode: 'FR',
        continent: 'Europe',
        score: 2,
        lastUpdated: new Date().toISOString(),
        message: 'Exercise increased caution due to terrorism and civil unrest.',
        source: 'Government Travel Advisory',
        details: [
          {
            category: 'safety',
            level: 'medium',
            description: 'Demonstrations in Paris and other major cities may turn violent. Avoid demonstration areas.'
          },
          {
            category: 'health',
            level: 'low',
            description: 'Standard health precautions advised. Public healthcare is excellent.'
          }
        ]
      },
      {
        id: '2',
        country: 'Japan',
        countryCode: 'JP',
        continent: 'Asia',
        score: 1,
        lastUpdated: new Date().toISOString(),
        message: 'Exercise normal precautions in Japan.',
        source: 'Government Travel Advisory',
        details: [
          {
            category: 'weather',
            level: 'medium',
            description: 'Typhoon season runs from June to December. Monitor local weather reports.'
          },
          {
            category: 'health',
            level: 'low',
            description: 'No significant health concerns. High-quality healthcare is widely available.'
          }
        ]
      }
    ];
    
    return mockAdvisories.filter(advisory => 
      advisory.countryCode === countryCode || countryCode === 'ALL'
    );
  },

  async saveTrip(trip: Trip): Promise<Trip> {
    // Mock saving a trip (just return it with an ID)
    return {
      ...trip,
      id: trip.id || Math.random().toString(36).substring(2, 11)
    };
  },

  async getTrips(): Promise<Trip[]> {
    // Mock trips for development
    const startDate = new Date();
    
    // Create a function to generate itinerary items for a trip
    const generateItinerary = (days: number, startDate: Date): ItineraryItem[] => {
      return Array(days).fill(null).map((_, i) => {
        const date = addDays(startDate, i);
        return {
          id: `day-${i+1}`,
          day: i + 1,
          date: format(date, 'yyyy-MM-dd'),
          activities: [
            {
              id: `activity-${i}-1`,
              name: i === 0 ? 'Arrival and Check-in' : i === days - 1 ? 'Check-out and Departure' : `Day ${i+1} Activity`,
              description: i === 0 ? 'Arrive at destination and check into accommodation' : 
                           i === days - 1 ? 'Check out from accommodation and head to airport' : 
                           `Explore the city on day ${i+1}`,
              startTime: i === 0 ? '15:00' : i === days - 1 ? '10:00' : '09:00',
              endTime: i === 0 ? '18:00' : i === days - 1 ? '15:00' : '17:00',
              category: i === 0 || i === days - 1 ? 'accommodation' : 'sightseeing'
            },
            {
              id: `activity-${i}-2`,
              name: `Dinner at local restaurant`,
              startTime: '19:00',
              endTime: '21:00',
              category: 'dining'
            }
          ]
        };
      });
    };
    
    return [
      {
        id: '1',
        name: 'Summer in Paris',
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(addDays(startDate, 7), 'yyyy-MM-dd'),
        destination: {
          name: 'Paris',
          lat: 48.8566,
          lon: 2.3522,
          country: 'France'
        },
        travelerCount: 2,
        itinerary: generateItinerary(7, startDate),
        notes: 'Remember to pack adapter plugs for European outlets.'
      },
      {
        id: '2',
        name: 'Tokyo Adventure',
        startDate: format(addDays(startDate, 30), 'yyyy-MM-dd'),
        endDate: format(addDays(startDate, 40), 'yyyy-MM-dd'),
        destination: {
          name: 'Tokyo',
          lat: 35.6762,
          lon: 139.6503,
          country: 'Japan'
        },
        travelerCount: 1,
        itinerary: generateItinerary(10, addDays(startDate, 30)),
        notes: 'Research Japan Rail Pass before departure.'
      }
    ];
  }
};

// Use mock service for development, real service for production
export default import.meta.env.PROD ? travelService : mockTravelService;