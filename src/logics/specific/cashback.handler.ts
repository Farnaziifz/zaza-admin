import { cashbackApi } from '@/resources/api/cashback'

const api = cashbackApi()

export const initHandler = async () => {
  return await api.get()
}

export const sendCashbackDataToServer = async () => {
  return api.put()
}