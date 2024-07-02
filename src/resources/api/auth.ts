import { api } from './index'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toast } from 'vue3-toastify'

const router = useRouter()
const pageUrl = 'auth'

type RefreshResponse = {
  access: string
  // Add other properties if needed
}
const login = async (username: string, password: string) => {
  try {
    const res = await api.post(`${pageUrl}/token/`, { username, password })
    return res.data
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
      return false
    }
    if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
      router.push('/')
      toast.error('شما دسترسی ندارید')
    }
  }
}

const getRefresh = async (): Promise<RefreshResponse | false> => {
  try {
    const res = await api.post<RefreshResponse>(`${pageUrl}/token/refresh/`, {
      refresh: localStorage.getItem('refresh'),
    })

    if (res.data && res.data.access) {
      localStorage.setItem('access', res.data.access)
      return res.data
    } else {
      return false
    }
  } catch (e) {
    if (axios.isAxiosError(e) && e.response && e.response.status === 400) {
      return false
    }
    if (axios.isAxiosError(e) && e.response && e.response.status === 401) {
      router.push('/')
    }
    // Optionally handle other error statuses or log the error
    return false
  }
}

export const authApi = () => {
  return {
    login,
    getRefresh,
  }
}
