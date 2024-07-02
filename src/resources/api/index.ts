import axios from 'axios'
import router from '../router'
import { toast } from 'vue3-toastify'

type RefreshResponse = {
  access: string
  // Add other properties if needed
}
// Function to get the access token from local storage
const getToken = () => {
  return localStorage.getItem('adminToken')
}

// Axios instance for API requests
export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASEURL,
  timeout: 5000,
})

// Request interceptor to add authorization header with token
api.interceptors.request.use(
  (config) => {
    // Ensure config.url is defined before checking its value
    if (
      config.url &&
      !config.url.includes('login') &&
      !config.url.includes('otp')
    ) {
      const token = getToken()

      if (token) {
        if (!config.headers) {
          config.headers = {}
        }
        config.headers['Authorization'] = 'Bearer ' + token
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Function to refresh access token

const getRefresh = async (): Promise<RefreshResponse | false> => {
  try {
    const res = await api.post<RefreshResponse>(`auth/token/refresh/`, {
      refresh: localStorage.getItem('adminRefresh'),
    })

    if (res.data && res.data.access) {
      localStorage.setItem('adminToken', res.data.access)
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
      toast.error('شما دسترسی ندارید.')
    }
    // Optionally handle other error statuses or log the error
    return false
  }
}

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 400) {
      toast.error('دیتای ارسالی اشتباه است.')
    }
    // Check if the error response status is 403 (forbidden)
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true // Prevent infinite loop

      // Call your refresh token endpoint to get a new access token
      try {
        const refreshedToken = await getRefresh()
        if (refreshedToken) {
          // Set the new token in the Authorization header
          api.defaults.headers.common['Authorization'] =
            'Bearer ' + refreshedToken
          originalRequest.headers['Authorization'] = 'Bearer ' + refreshedToken

          // Retry the original request with the new token
          return api(originalRequest)
        } else {
          // Handle case where refresh token is invalid or expired
          // For example, redirect to login page
          router.push('/login') // Uncomment and modify this line based on your routing logic
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError)
        // Handle refresh token failure
        // For example, redirect to login page
        // router.push('/login'); // Uncomment and modify this line based on your routing logic
      }
    }

    return Promise.reject(error)
  }
)
