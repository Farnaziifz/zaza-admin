import axios from 'axios'
import type { App } from 'vue'
import { ApiOptions } from '../../core/types/apiOptions.type'

export const createApi = (options: ApiOptions) => {
  return {
    install: (app: App) => {
      app.config.globalProperties.$api = axios.create({
        baseURL: options.baseUrl,
        headers: {
          Authorization: options.token ? `Bearer ${options.token}` : '',
        },
      })
    },
  }
} 

