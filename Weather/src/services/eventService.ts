import axios from 'axios';
import type { Event, EventsFilter } from '../types/event';
import { format, addDays } from 'date-fns';

// Note: In a real app, you would store this in an environment variable
const EVENTS_API_KEY = 'YOUR_EVENTS_API_KEY';
const EVENTS_API_URL = 'https://api.example.com/events';

export const eventService = {
  async getEvents(filter: EventsFilter): Promise<Event[]> {
    try {
      const response = await axios.get(`${EVENTS_API_URL}/search`, {
        params: {
          ...filter,
          apiKey: EVENTS_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  async getEventDetails(eventId: string): Promise<Event> {
    try {
      const response = await axios.get(`${EVENTS_API_URL}/${eventId}`, {
        params: {
          apiKey: EVENTS_API_KEY
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching event details:', error);
      throw error;
    }
  }
};

// Mock service for development
export const mockEventService = {
  async getEvents(filter: EventsFilter): Promise<Event[]> {
    // Generate 20 mock events
    const mockEvents: Event[] = Array(20).fill(null).map((_, i) => {
      const categories: Array<Event['category']> = ['music', 'food', 'arts', 'sports', 'outdoors', 'festivals', 'nightlife', 'family', 'business'];
      const category = categories[i % categories.length];
      const startDate = filter.dateFrom ? 
        new Date(filter.dateFrom) : 
        addDays(new Date(), i % 30);
      const endDate = addDays(startDate, Math.floor(Math.random() * 3) + 1);
      const isFree = i % 5 === 0;
      const price = isFree ? 0 : Math.floor(Math.random() * 100) + 10;
      
      return {
        id: `event-${i}`,
        name: `${category.charAt(0).toUpperCase() + category.slice(1)} Event ${i+1}`,
        description: `This is a great ${category} event happening in the city. Don't miss out!`,
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
        location: {
          name: `Venue ${i+1}`,
          address: `${i+100} Main Street, City`,
          lat: 48.8566 + (Math.random() * 0.1 - 0.05),
          lon: 2.3522 + (Math.random() * 0.1 - 0.05)
        },
        category,
        imageUrl: `https://picsum.photos/seed/${i}/500/300`,
        url: `https://example.com/events/${i}`,
        price: {
          value: price,
          currency: 'USD',
          isFree
        },
        organizer: `Organizer ${i+1}`,
        attendingCount: Math.floor(Math.random() * 1000) + 50,
        rating: Math.floor(Math.random() * 5) + 1,
        tags: ['popular', category, i % 2 === 0 ? 'weekend' : 'weekday'],
        isFeatured: i < 3
      };
    });
    
    // Apply filters
    let filteredEvents = [...mockEvents];
    
    if (filter.dateFrom) {
      filteredEvents = filteredEvents.filter(event => new Date(event.startDate) >= new Date(filter.dateFrom!));
    }
    
    if (filter.dateTo) {
      filteredEvents = filteredEvents.filter(event => new Date(event.startDate) <= new Date(filter.dateTo!));
    }
    
    if (filter.categories && filter.categories.length > 0) {
      filteredEvents = filteredEvents.filter(event => filter.categories!.includes(event.category));
    }
    
    if (filter.isFree !== undefined) {
      filteredEvents = filteredEvents.filter(event => event.price?.isFree === filter.isFree);
    }
    
    if (filter.priceRange) {
      filteredEvents = filteredEvents.filter(event => 
        event.price && 
        event.price.value >= filter.priceRange![0] && 
        event.price.value <= filter.priceRange![1]
      );
    }
    
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.name.toLowerCase().includes(term) || 
        event.description.toLowerCase().includes(term)
      );
    }
    
    // Sort
    if (filter.sortBy) {
      filteredEvents.sort((a, b) => {
        switch (filter.sortBy) {
          case 'date':
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          case 'popularity':
            return (b.attendingCount || 0) - (a.attendingCount || 0);
          case 'price':
            return (a.price?.value || 0) - (b.price?.value || 0);
          default:
            return 0;
        }
      });
    }
    
    return filteredEvents;
  },

  async getEventDetails(eventId: string): Promise<Event> {
    // For mock, just return a single detailed event
    const mockEvent: Event = {
      id: eventId,
      name: 'Summer Music Festival',
      description: 'The biggest music festival of the summer featuring top artists from around the world. Three days of amazing performances, food, and fun.',
      startDate: format(new Date(), 'yyyy-MM-dd'),
      endDate: format(addDays(new Date(), 3), 'yyyy-MM-dd'),
      location: {
        name: 'City Park Amphitheater',
        address: '123 Park Avenue, City Center',
        lat: 48.8566,
        lon: 2.3522
      },
      category: 'music',
      imageUrl: 'https://picsum.photos/seed/festival/800/400',
      url: 'https://example.com/events/summer-festival',
      price: {
        value: 149.99,
        currency: 'USD',
        isFree: false
      },
      organizer: 'City Events Productions',
      attendingCount: 5000,
      rating: 4.8,
      tags: ['music', 'festival', 'summer', 'outdoor'],
      isFeatured: true
    };
    
    return mockEvent;
  }
};

// Use mock service for development, real service for production
export default import.meta.env.PROD ? eventService : mockEventService;