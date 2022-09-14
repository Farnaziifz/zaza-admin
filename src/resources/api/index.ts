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
