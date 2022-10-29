// import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from './index'
import { retentionLoyalityRateOverallStatistics } from '../../core/types/businessIntelligence'
import { retantionRateCustomerList } from '../../core/types/retantionRate.type'
import { error } from '../../core/types/error.type'
import { makeARequest } from '@/logics/shared/apiResponse.handler'

const pageUrl = 'business-intelligence'
type responses = {
  data: retentionLoyalityRateOverallStatistics
  errors: error
}
const getRetentionLoyalityRateOverallStatistics =
  async (): Promise<responses> => {
    const res = await api.get(`${pageUrl}/retention-rate/overall-statistics`)
    return res.data
  }

const getRetantionLoyalCustomerList = async (page = 1, filter = '') =>
  await makeARequest<retantionRateCustomerList>(
    api.get,
    `${pageUrl}/retention-rate/customer?Page=${page}&${filter}`
  )

export const retaitionLoyalityApi = () => ({
  getRetentionLoyalityRateOverallStatistics,
  getRetantionLoyalCustomerList,
})
