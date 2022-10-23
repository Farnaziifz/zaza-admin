import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'
import { filter } from '@/core/types/filter.type'
import { filterQueryBuilder } from '@/logics/shared/filter.handler'

const api = businessIntelligenceApi()

export const initHandler = async (filters: filter[]) => {
  const query = filterQueryBuilder(filters)
  const churnRateCustomerList = await api.getChurnRateCustomer(1, query)
  const overallStatistics = await api.getChurnRateOverallStatistics()

  return {
    churnRateCustomerList,
    overallStatistics,
  }
}

export const churnCustomerListGETHandler = async (
  page?: number,
  filters?: filter[]
) => {
  let query = ''
  if (filters) query = filterQueryBuilder(filters)
  const res = await api.getChurnRateCustomer(page, query)
  return res.data
}
