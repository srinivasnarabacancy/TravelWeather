export interface Advisory {
  id: string;
  country: string;
  countryCode: string;
  continent: string;
  score: number; // 1-5 where 5 is highest risk
  lastUpdated: string;
  message: string;
  source: string;
  details: AdvisoryDetail[];
}

export interface AdvisoryDetail {
  category: 'safety' | 'health' | 'transportation' | 'weather' | 'political';
  level: 'low' | 'medium' | 'high' | 'extreme';
  description: string;
}

export interface Trip {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  destination: {
    name: string;
    lat: number;
    lon: number;
    country: string;
  };
  travelerCount: number;
  itinerary: ItineraryItem[];
  notes?: string;
  weatherForecast?: any;
  advisories?: Advisory[];
}

export interface ItineraryItem {
  id: string;
  day: number;
  date: string;
  activities: Activity[];
}

export interface Activity {
  id: string;
  name: string;
  description?: string;
  startTime?: string;
  endTime?: string;
  location?: {
    name: string;
    lat?: number;
    lon?: number;
    address?: string;
  };
  category?: 'sightseeing' | 'dining' | 'accommodation' | 'transportation' | 'event' | 'other';
  cost?: number;
  currency?: string;
  isBooked?: boolean;
  bookingReference?: string;
  notes?: string;
}