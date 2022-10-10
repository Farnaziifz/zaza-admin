import { api } from './index'

const pageUrl = 'cashback'

const getCashback = async () => {
  return await api.get(pageUrl)
}

const postCashback = async () => {
  return await api.post(pageUrl)
}

export const cashbackApi = () => ({
  get: getCashback,
  post: postCashback,
})

