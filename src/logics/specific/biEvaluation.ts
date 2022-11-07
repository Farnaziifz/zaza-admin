import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'
import { filter } from '@/core/types/filter.type'
import { filterQueryBuilder } from '@/logics/shared/filter.handler'
import { queryList } from '@/logics/shared/queryBuilder'

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
  filters?: filter[],
  queries?: queryList
) => {
  let query = ''
  if (filters) query = filterQueryBuilder(filters)
  const res = await api.getChurnRateCustomer(page, query, queries)
  return res.data
}
