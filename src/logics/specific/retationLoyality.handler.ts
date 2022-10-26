import { retaitionLoyalityApi } from '../../resources/api/evaluationLoyality'

const api = retaitionLoyalityApi()

export const initHandler = async () => {
  const loyalityOverallStatistics =
    await api.getRetentionLoyalityRateOverallStatistics()
  return loyalityOverallStatistics
}
