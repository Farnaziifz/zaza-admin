import { retaitionLoyalityApi } from '../../resources/api/evaluationLoyality'
import { filter } from '@/core/types/filter.type'
import { filterQueryBuilder } from '@/logics/shared/filter.handler'
import { retantionRateSetting } from '../../core/types/retantionRate.type'
const api = retaitionLoyalityApi()

export const initHandler = async () => {
  const loyalityOverallStatistics =
    await api.getRetentionLoyalityRateOverallStatistics()
  return loyalityOverallStatistics
}

export const retantionLoyalCustomerList = async (
  page: number,
  filters: filter[]
) => {
  let query = ''
  if (filters) query = filterQueryBuilder(filters)
  const res = await api.getRetantionLoyalCustomerList(page, query)
  return res.data
}

export const updateRetantionRate = async (data: retantionRateSetting) => {
  const res = await api.retantionRatePut(data)
  return res
}

export const retantionRateGetDetails = async () => {
  const res = await api.retantionRateGetDetails()
  return res.data
}
