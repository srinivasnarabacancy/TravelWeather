import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './style.css';

const pinia = createPinia();

// Add plugin to persist store state
pinia.use(({ store }) => {
  const initialState = localStorage.getItem(`pinia-${store.$id}`);
  
  if (initialState) {
    store.$patch(JSON.parse(initialState));
  }
  
  store.$subscribe((mutation, state) => {
    localStorage.setItem(`pinia-${store.$id}`, JSON.stringify(state));
  });
});

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app');