import axios from 'axios';
import type { WeatherForecast, Location } from '../types/weather';

// Note: In a real app, you would store this in an environment variable
const API_KEY = 'YOUR_OPENWEATHER_API_KEY';
const BASE_URL = 'https://api.openweathermap.org/data/3.0';

export const weatherService = {
  async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast> {
    try {
      const response = await axios.get(`${BASE_URL}/onecall`, {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: 'metric',
          exclude: 'minutely,alerts'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  },

  async searchLocations(query: string): Promise<Location[]> {
    try {
      const response = await axios.get(`${BASE_URL}/geo/1.0/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: API_KEY
        }
      });
      
      return response.data.map((item: any) => ({
        name: item.name,
        lat: item.lat,
        lon: item.lon,
        country: item.country,
        state: item.state
      }));
    } catch (error) {
      console.error('Error searching locations:', error);
      throw error;
    }
  }
};

// Mock functions for development
export const mockWeatherService = {
  async getWeatherForecast(lat: number, lon: number): Promise<WeatherForecast> {
    // Return mock data for development
    return {
      lat,
      lon,
      timezone: 'America/New_York',
      timezone_offset: -18000,
      current: {
        dt: Date.now() / 1000,
        sunrise: Date.now() / 1000 - 21600,
        sunset: Date.now() / 1000 + 21600,
        temp: 22.5,
        feels_like: 21.8,
        pressure: 1015,
        humidity: 65,
        dew_point: 15.2,
        uvi: 4.5,
        clouds: 25,
        visibility: 10000,
        wind_speed: 3.5,
        wind_deg: 220,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: '02d'
          }
        ]
      },
      hourly: Array(24).fill(null).map((_, i) => ({
        dt: Date.now() / 1000 + i * 3600,
        temp: 22.5 + Math.sin(i / 24 * Math.PI * 2) * 5,
        feels_like: 21.8 + Math.sin(i / 24 * Math.PI * 2) * 4.5,
        pressure: 1015,
        humidity: 65,
        dew_point: 15.2,
        uvi: i > 6 && i < 18 ? 4.5 : 0,
        clouds: 25,
        visibility: 10000,
        wind_speed: 3.5,
        wind_deg: 220,
        pop: 0.2,
        weather: [
          {
            id: 801,
            main: 'Clouds',
            description: 'few clouds',
            icon: i > 6 && i < 18 ? '02d' : '02n'
          }
        ]
      })),
      daily: Array(7).fill(null).map((_, i) => ({
        dt: Date.now() / 1000 + i * 86400,
        sunrise: Date.now() / 1000 - 21600 + i * 86400,
        sunset: Date.now() / 1000 + 21600 + i * 86400,
        moonrise: Date.now() / 1000 - 10800 + i * 86400,
        moonset: Date.now() / 1000 + 32400 + i * 86400,
        moon_phase: (i % 30) / 30,
        temp: {
          day: 22.5 + Math.sin(i / 7 * Math.PI) * 5,
          min: 17.5 + Math.sin(i / 7 * Math.PI) * 4,
          max: 27.5 + Math.sin(i / 7 * Math.PI) * 6,
          night: 18.5 + Math.sin(i / 7 * Math.PI) * 4.5,
          eve: 20.5 + Math.sin(i / 7 * Math.PI) * 5,
          morn: 19 + Math.sin(i / 7 * Math.PI) * 4
        },
        feels_like: {
          day: 21.8 + Math.sin(i / 7 * Math.PI) * 4.5,
          night: 17.8 + Math.sin(i / 7 * Math.PI) * 4,
          eve: 19.8 + Math.sin(i / 7 * Math.PI) * 4.5,
          morn: 18.3 + Math.sin(i / 7 * Math.PI) * 3.5
        },
        pressure: 1015,
        humidity: 65,
        dew_point: 15.2,
        wind_speed: 3.5,
        wind_deg: 220,
        weather: [
          {
            id: 800 + (i % 3),
            main: i % 3 === 0 ? 'Clear' : i % 3 === 1 ? 'Clouds' : 'Rain',
            description: i % 3 === 0 ? 'clear sky' : i % 3 === 1 ? 'few clouds' : 'light rain',
            icon: i % 3 === 0 ? '01d' : i % 3 === 1 ? '02d' : '10d'
          }
        ],
        clouds: i % 3 === 1 ? 25 : i % 3 === 2 ? 75 : 0,
        pop: i % 3 === 2 ? 0.6 : 0.1,
        rain: i % 3 === 2 ? 2.5 : undefined,
        uvi: 4.5
      }))
    } as WeatherForecast;
  },

  async searchLocations(query: string): Promise<Location[]> {
    // Mock locations for development
    const mockLocations = [
      { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'US', state: 'New York' },
      { name: 'London', lat: 51.5074, lon: -0.1278, country: 'GB' },
      { name: 'Paris', lat: 48.8566, lon: 2.3522, country: 'FR' },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'JP' },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'AU' }
    ];
    
    return mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Use mock service for development, real service for production
export default import.meta.env.PROD ? weatherService : mockWeatherService;