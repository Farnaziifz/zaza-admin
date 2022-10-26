import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import { promotionUsageReport } from '@/core/types/discounts.type'

const baseUrl = 'report'
const promotionUsage = '/promotion-usage'
export const getReportPromotionUsage = async (page = 1) =>
  await makeARequest<promotionUsageReport>(
    api.get,
    `${baseUrl}${promotionUsage}?Page=${page}`
  )

export const reportApi = () => ({
  getReportPromotionUsage,
})
