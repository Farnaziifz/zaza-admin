import { api } from './index'
import { cashback } from '@/core/types/cashback.type'
import { makeARequest } from '@/logics/shared/apiResponse.handler'

const pageUrl = 'cashback'

const getCashback = async () => await makeARequest<cashback>(api.get, pageUrl)

const putCashback = async (cashbackData: cashback) =>
  await makeARequest<cashback>(api.put, pageUrl, cashbackData)

const putCashbackStatus = async () => {
  const status = '/status'
  return await api.put(pageUrl + status)
}

export const cashbackApi = () => ({
  get: getCashback,
  put: putCashback,
  putStatus: putCashbackStatus,
})
