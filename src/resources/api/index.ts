import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://boomjar-api.webjarprojects.ir',
  timeout: 5000,
  headers: {
    'X-Api-Version': '1.0',
    // Authorization: options.token ? `Bearer ${options.token}` : '',
    // lang:
  },
})
