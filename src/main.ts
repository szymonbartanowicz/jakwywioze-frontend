import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia, Pinia} from 'pinia'
import vuetify from './vuetify/vuetify'

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')
