import { cashbackApi } from '@/resources/api/cashback'
import { cashbackType, durationTypeEnum } from '@/core/enums/cashback.enum'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

type cashback = {
  amount?: number
  minimumAmount?: number
  maximumPrice?: number
  type?: cashbackType
  durationType?: durationTypeEnum
  duration?: number
  isActive: boolean
}

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
  if (res?.status === 200 || res?.status === 204) showSuccessMessage()
}