import './style.css'
import App from './App.vue'
import { createApp } from 'vue'
import store from './resources/store'
import 'ant-design-vue/dist/antd.less'
import router from './resources/router'
import { toPersianCurrency } from './logics/shared/toPersianCurrency'
import { toPersianDate } from './logics/shared/toPersianDate'
// SETS UP VUE i18n
import { initLanguage } from 'vui18n'
import en from './core/languages/en.json'
import fa from './core/languages/fa.json'

initLanguage({
  defaultLanguage: 'fa',
  persistLocalstorage: true,
  setLanguage: 'fa',
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

const app = createApp(App).use(store).use(router)

app.config.globalProperties.$filters = {
  toPersianCurrency,
  toPersianDate,
}

// TODO => apply this code to seprate file
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $filters: {
      toPersianCurrency: (number: number, symbol: string | null) => string
      toPersianDate: (date: string) => string
    }
  }
}

app.mount('#app')
