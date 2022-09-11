import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import store from './resources/store'
import 'ant-design-vue/dist/antd.css'
import router from './resources/router'
import { createApi } from './resources/api'

const api = createApi({
  baseUrl: '',
})

createApp(App).use(api).use(store).use(router).mount('#app')
