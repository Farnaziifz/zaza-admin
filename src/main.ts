import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './resources/router'
import store from './resources/store'
import { createApi } from './resources/api'

const api = createApi({
  baseUrl: '',
})

createApp(App).use(api).use(store).use(router).mount('#app')
