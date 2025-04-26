export interface Event {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address?: string;
    lat?: number;
    lon?: number;
  };
  category: EventCategory;
  imageUrl?: string;
  url?: string;
  price?: {
    value: number;
    currency: string;
    isFree: boolean;
  };
  organizer?: string;
  attendingCount?: number;
  rating?: number;
  tags?: string[];
  isFeatured?: boolean;
}

export type EventCategory = 
  | 'music'
  | 'food'
  | 'arts'
  | 'sports'
  | 'outdoors'
  | 'festivals'
  | 'nightlife'
  | 'family'
  | 'business'
  | 'other';

export interface EventsFilter {
  dateFrom?: string;
  dateTo?: string;
  categories?: EventCategory[];
  priceRange?: [number, number];
  isFree?: boolean;
  searchTerm?: string;
  sortBy?: 'date' | 'popularity' | 'price';
  location?: {
    lat: number;
    lon: number;
    radius: number; // in km
  };
}