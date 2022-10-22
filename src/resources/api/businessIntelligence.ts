import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import { churnRate } from '@/core/types/businessIntelligence'

const pageUrl = 'business-intelligence'
const churnRateUrl = '/churn-rate'

const getChurnRate = async () =>
  await makeARequest<churnRate>(api.get, pageUrl + churnRateUrl)

const putChurnRate = async (churnData: churnRate) =>
  await makeARequest(api.put, pageUrl + churnRateUrl, churnData)

export const businessIntelligenceApi = () => ({
  getChurnRate,
  putChurnRate,
})
