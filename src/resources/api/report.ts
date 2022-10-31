import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import { promotionUsageReport } from '@/core/types/discounts.type'
import { couponsList } from '@/core/types/coupons.type'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import { getAllDaysInPeriodQuery } from '@/logics/shared/date.handler'
import { cashbackStatics } from '../../core/types/cashback.type'

const baseUrl = 'report'
const promotionUsage = '/promotion-usage'
const couponUsage = '/coupon-usage'
const dashboardStatisticsOverall = '/dashboard-statistics-overall'
const creditFinancialEvaluation = '/credit-financial-evaluation'
const cashbackFinancialEvaluation = '/cashback-financial-evaluation'
const promotionFinancialEvaluation = '/promotion-financial-evaluation'

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

const getReportCachbackStatistic = async () =>
  await makeARequest<cashbackStatics>(
    api.get,
    `${baseUrl}/cashback-statistics-overall`
  )

const getCreditFinancialEvaluation = async (type: reportPeriodType) => {
  const query = getAllDaysInPeriodQuery(type)
  const res = await makeARequest(
      api.get,
      `${baseUrl}${creditFinancialEvaluation}${query}`
  )

  return res
}


const getCashbackFinancialEvaluation = async (type: reportPeriodType) => {
  const query = getAllDaysInPeriodQuery(type)
  const res = await makeARequest(
      api.get,
      `${baseUrl}${cashbackFinancialEvaluation}${query}`
  )

  return res
}

const getPromotionFinancialEvaluation = async (type: reportPeriodType) => {
  const query = getAllDaysInPeriodQuery(type)
  const res = await makeARequest(
      api.get,
      `${baseUrl}${promotionFinancialEvaluation}${query}`
  )

  return res
}

export const reportApi = () => ({
  getReportPromotionUsage,
  getReportCouponUsage,
  getReportCachbackStatistic,
  getDashboardStatisticsOverall,
  getCreditFinancialEvaluation,
  getCashbackFinancialEvaluation,
  getPromotionFinancialEvaluation,
})
