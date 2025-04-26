import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'Weather & Travel' }
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('../views/WeatherPage.vue'),
    meta: { title: 'Weather Forecast' }
  },
  {
    path: '/advisories',
    name: 'TravelAdvisories',
    component: () => import('../views/AdvisoryPage.vue'),
    meta: { title: 'Travel Advisories' }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('../views/EventsPage.vue'),
    meta: { title: 'Local Events' }
  },
  {
    path: '/trips',
    name: 'Trips',
    component: () => import('../views/TripsPage.vue'),
    meta: { title: 'My Trips' }
  },
  {
    path: '/trips/new',
    name: 'NewTrip',
    component: () => import('../views/TripEditPage.vue'),
    meta: { title: 'Create New Trip' }
  },
  {
    path: '/trips/:id',
    name: 'TripDetails',
    component: () => import('../views/TripDetailsPage.vue'),
    meta: { title: 'Trip Details' }
  },
  {
    path: '/trips/:id/edit',
    name: 'EditTrip',
    component: () => import('../views/TripEditPage.vue'),
    meta: { title: 'Edit Trip' }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | TravelWeather` || 'TravelWeather';
  next();
});

export default router;