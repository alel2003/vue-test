import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'

import App from './app/index.vue'
import router from './router/index'

import './assets/css/index.css'

const pinia = createPinia()
const app = createApp(App)

app.use(MotionPlugin)
app.use(pinia)
app.use(router)
app.mount('#app')
