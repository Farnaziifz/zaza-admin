import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'
import { churnRate } from '@/core/types/businessIntelligence'

const api = businessIntelligenceApi()

export const initHandler = async () => await api.getChurnRate()
export const putServerDataHandler = async (serverData: churnRate) =>
  await api.putChurnRate(serverData)
