import { customerApi } from '@/resources/api/customer'
import {
  barChartEvaluationServerReport,
  reportApi,
} from '@/resources/api/report'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'
import { getPersianNameOfMonth } from '@/logics/shared/date.handler'
import { queryDateClientFormat } from '@/core/constants/date.options'

const api = customerApi()
const repApi = reportApi()
const BIApi = businessIntelligenceApi()

export const initHandler = async () => {
  const degreeLabelOverallStatistics =
    await api.getCustomerDegreeLabelOverallStatistics()

  const orderOverallStatistics = await api.getCustomerOrderOverallStatistics()

  const overallStatistics = await repApi.getDashboardStatisticsOverall()

  const churnRate = await BIApi.getChurnRateOverallStatistics()
  const retentionRate = await BIApi.getRetentionRateOverallStatistics()

  const { cashbackEvaluation, promotionEvaluation, creditEvaluation } =
    await getFinancialEvaluations(reportPeriodType.WEEKLY)

  return {
    degreeLabelOverallStatisticsData: degreeLabelOverallStatistics.data,
    orderOverallStatistics: orderOverallStatistics.data,
    reportOverallStatistics: overallStatistics.data,
    promotionEvaluation: promotionEvaluation,
    cashbackEvaluation: cashbackEvaluation,
    creditEvaluation: creditEvaluation,
    retentionRate: retentionRate.data,
    churnRate: churnRate.data,
  }
}
const createEval = (
  evalData?: barChartEvaluationServerReport,
  periodType?: reportPeriodType
) => ({
  data:
    periodType === reportPeriodType.WEEKLY ||
    periodType === reportPeriodType.MONTHLY
      ? evalData?.map((el) => el.sumIncome)
      : evalData?.map((el) => el.sumIncome).reverse(),
  label:
    periodType === reportPeriodType.WEEKLY ||
    periodType === reportPeriodType.MONTHLY
      ? evalData?.map((el, index) => `روز  ${index + 1}`)
      : evalData
          ?.map((el) => getPersianNameOfMonth(el.to, queryDateClientFormat))
          .reverse(),
})

export const getFinancialEvaluations = async (periodType: reportPeriodType) => {
  const cashbackEvaluation = await repApi.getCashbackFinancialEvaluation(
    periodType
  )
  const cashbackEvalData = createEval(cashbackEvaluation.data, periodType)

  const promotionEvaluation = await repApi.getPromotionFinancialEvaluation(
    periodType
  )

  const promotionEvalData = createEval(promotionEvaluation.data, periodType)

  const creditEvaluation = await repApi.getCreditFinancialEvaluation(periodType)
  const creditEvalData = createEval(creditEvaluation.data, periodType)

  return {
    cashbackEvaluation: cashbackEvalData,
    promotionEvaluation: promotionEvalData,
    creditEvaluation: creditEvalData,
  }
}
