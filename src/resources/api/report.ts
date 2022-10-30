import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import { promotionUsageReport } from '@/core/types/discounts.type'
import { couponsList } from '@/core/types/coupons.type'

const baseUrl = 'report'
const promotionUsage = '/promotion-usage'
const couponUsage = '/coupon-usage'
const dashboardStatisticsOverall = '/dashboard-statistics-overall'

export const getDashboardStatisticsOverall = async () =>
  await makeARequest<{
    numberOfCustomers: number
    numberOfFeedbacks: number
    customerWithRepurchase: number
  }>(api.get, `${baseUrl}${dashboardStatisticsOverall}`)

export const getReportPromotionUsage = async (page = 1) =>
  await makeARequest<promotionUsageReport>(
    api.get,
    `${baseUrl}${promotionUsage}?Page=${page}`
  )

const getReportCouponUsage = async (page = 1) =>
  await makeARequest<couponsList>(
    api.get,
    `${baseUrl}${couponUsage}?Page=${page}`
  )

export const reportApi = () => ({
  getReportPromotionUsage,
  getReportCouponUsage,
  getDashboardStatisticsOverall,
})
