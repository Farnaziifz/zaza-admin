import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import {
  churnRate,
  retentionRateCustomerList,
  retentionRateOverallStatistics,
} from '@/core/types/businessIntelligence'

const pageUrl = 'business-intelligence'
const churnRateUrl = '/churn-rate'
const retentionRate = '/retention-rate'
const customer = '/customer'
const overallStatistics = '/overall-statistics'

const getChurnRate = async () =>
  await makeARequest<churnRate>(api.get, pageUrl + churnRateUrl)

const putChurnRate = async (churnData: churnRate) =>
  await makeARequest(api.put, pageUrl + churnRateUrl, churnData)

const getRetentionRateCustomer = async (page = 1) =>
  await makeARequest<retentionRateCustomerList>(
    api.get,
    `${pageUrl}${retentionRate}${customer}?Page=${page}`
  )

const getRetentionRateOverallStatistics = async () =>
  await makeARequest<retentionRateOverallStatistics>(
    api.get,
    `${pageUrl}${retentionRate}${overallStatistics}`
  )

export const businessIntelligenceApi = () => ({
  getChurnRate,
  putChurnRate,
  getRetentionRateCustomer,
  getRetentionRateOverallStatistics,
})
