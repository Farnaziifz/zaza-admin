import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { api } from '@/resources/api/index'
import { promotionUsageReport } from '@/core/types/discounts.type'
import { couponsList } from '@/core/types/coupons.type'
import momentJalali, { unitOfTime } from 'jalali-moment'
import moment from 'moment'
import { reportPeriodType } from '@/core/enums/reportType.enum'

const baseUrl = 'report'
const promotionUsage = '/promotion-usage'
const couponUsage = '/coupon-usage'
const dashboardStatisticsOverall = '/dashboard-statistics-overall'
const creditFinancialEvaluation = '/credit-financial-evaluation'

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

const getCreditFinancialEvaluation = async (type: reportPeriodType) => {
  let momentStartOfType: unitOfTime.StartOf = 'weeks'
  let step: unitOfTime.DurationConstructor = 'jD'
  let diffUnit: unitOfTime.Diff = 'days'
  switch (type) {
    case 'WEEKLY':
      momentStartOfType = 'jw'
      break
    case 'MONTHLY':
      momentStartOfType = 'jMonth'
      break
    case 'ANNUAL':
      momentStartOfType = 'jYear'
      step = 'jMonth'
      diffUnit = 'month'
      break
  }

  const format = 'yyyy/MM/DD-hh:mm:ss'
  const startOfRange = momentJalali().utc().startOf(momentStartOfType)
  const today = momentJalali().utc().startOf(step)
  const startOfRangeDiffUntilNow = today.diff(startOfRange, diffUnit)

  const range: { from: Date; to: Date }[] = []
  const currentDate = startOfRange.clone()

  //TODO MAHDI
  for (let i = 0; i <= startOfRangeDiffUntilNow; i++) {
    range.push({
      from: currentDate.startOf(step).startOf('jDay').toDate(),
      to: currentDate.endOf(step).startOf('jDay').toDate(),
    })
    currentDate.add(1, step)
  }

  let q = `?Format=${format}&`
  range.forEach((el, index) => {
    q += `Ranges[${index}].From=${moment(el.from).format(
      format
    )}&Ranges[${index}].To=${moment(el.to).format(format)}&`
  })

  const res = await makeARequest(
    api.get,
    `${baseUrl}${creditFinancialEvaluation}${q}`
  )

  return res
}

export const reportApi = () => ({
  getReportPromotionUsage,
  getReportCouponUsage,
  getDashboardStatisticsOverall,
  getCreditFinancialEvaluation,
})
