// import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from './index'
import { retentionLoyalityRateOverallStatistics } from '../../core/types/businessIntelligence'
import { error } from '../../core/types/error.type'

const pageUrl = 'business-intelligence'
type responses = {
  data: retentionLoyalityRateOverallStatistics
  errors: error
}
const getRetentionLoyalityRateOverallStatistics =
  async (): Promise<responses> => {
    const res = await api.get(`${pageUrl}/retention-rate/overall-statistics`)
    console.log(res)
    return res.data
  }

export const retaitionLoyalityApi = () => ({
  getRetentionLoyalityRateOverallStatistics,
})
