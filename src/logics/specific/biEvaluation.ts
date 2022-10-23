import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'

const api = businessIntelligenceApi()

export const initHandler = async () => {
  const retentionRateCustomer = await api.getRetentionRateCustomer()
  const overallStatistics = await api.getRetentionRateOverallStatistics()

  return {
    retentionRateCustomer,
    overallStatistics,
  }
}

export const getRetentionCustomerListHandler = async (page?: number) => {
  const res = await api.getRetentionRateCustomer(page)
  return res.data
}

