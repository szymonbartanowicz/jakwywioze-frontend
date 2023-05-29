import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia, Pinia} from 'pinia'
import "@mdi/font/css/materialdesignicons.css";



// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')
