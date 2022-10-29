import { retaitionLoyalityApi } from '../../resources/api/evaluationLoyality'
import { filter } from '@/core/types/filter.type'
import { filterQueryBuilder } from '@/logics/shared/filter.handler'

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
