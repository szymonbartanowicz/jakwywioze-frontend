import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia, Pinia} from 'pinia'
import vuetify from './vuetify/vuetify'
import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

createApp(App).use(router).use(vuetify).use(createPinia()).use(VCalendar).mount('#app')

