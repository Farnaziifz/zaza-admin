import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import store from './resources/store'
import 'ant-design-vue/dist/antd.css'
import router from './resources/router'
import {createApi} from './resources/api'
import {initLanguage} from "vui18n";

const api = createApi({
  baseUrl: '',
})

initLanguage({
    defaultLanguage: 'en',
    persistLocalstorage: true,
    languages: [
        {
            code: 'en',
            file: '/src/core/languages/en.json'
        },
        {
            code: 'fa',
            file: '/src/core/languages/fa.json'
        }
    ]
})

createApp(App).use(api).use(store).use(router).mount('#app')
