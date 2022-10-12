import { cashbackApi } from '@/resources/api/cashback'
import { cashback } from '@/core/types/cashback.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = cashbackApi()

export const initHandler = async () => {
  return await api.get()
}

export const changeStatusHandler = async () => {
  showLoadingMessage()
  const res = await api.putStatus()
  if (res.status === 200 || res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const sendCashbackDataToServer = async (cashbackData: cashback) => {
  showLoadingMessage()
  const res = await api.put(cashbackData)
  if (!res.errors) showSuccessMessage()
}
