import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./resources/router"
import store from "./resources/store"

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
