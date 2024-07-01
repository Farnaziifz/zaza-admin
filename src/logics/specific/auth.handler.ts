import { authApi } from '@/resources/api/auth'

const api = authApi()


export const login = async (username: string, password: string) => {
  const res = await api.login(username, password)
  return res
}
