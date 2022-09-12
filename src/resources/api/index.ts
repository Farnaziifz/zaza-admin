// import axios from 'axios'
// import type { App } from 'vue'
// import { ApiOptions } from '../../core/types/apiOptions.type'
//
// export const createApi = (options: ApiOptions) => {
//   return {
//     install: (app: App) => {
//       app.config.globalProperties.$api = axios.create({
//         baseURL: options.baseUrl,
//         headers: {
//           Authorization: options.token ? `Bearer ${options.token}` : '',
//         },
//       })
//     },
//   }
// }
//

import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://192.168.31.34:5010',
  timeout: 5000,
  headers: {
    'X-Api-Version': '1.0',
    // Authorization: options.token ? `Bearer ${options.token}` : '',
    // lang:
  },
})
