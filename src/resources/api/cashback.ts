import { api } from './index'
import { AxiosResponse } from 'axios'
import { durationTypeEnum } from '@/core/enums/cashback.enum'

const pageUrl = 'cashback'

type response<T> = {
  data?: T
}

type cashbackType = {
  amount: number
  minimumAmount: number
  maximumPrice: number
  type: cashbackType
  durationType: durationTypeEnum
  duration: number
  isActive: boolean
}

const getCashback = async (): Promise<AxiosResponse<response<cashbackType>>> =>
  await api.get(pageUrl)

const putCashback = async () => {
  return await api.put(pageUrl)
}

export const cashbackApi = () => ({
  get: getCashback,
  put: putCashback,
})

