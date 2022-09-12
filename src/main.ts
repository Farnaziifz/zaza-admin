import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import store from './resources/store'
import 'ant-design-vue/dist/antd.css'
import router from './resources/router'

// SETS UP VUE i18n
import { initLanguage } from 'vui18n'
import en from './core/languages/en.json'
import fa from './core/languages/fa.json'

initLanguage({
  defaultLanguage: 'en',
  persistLocalstorage: true,
  setLanguage: 'en',
  languages: [
    {
      code: 'en',
      file: en,
    },
    {
      code: 'fa',
      file: fa,
    },
  ],
})

createApp(App).use(store).use(router).mount('#app')
