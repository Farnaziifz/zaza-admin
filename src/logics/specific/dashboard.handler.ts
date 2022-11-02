import { customerApi } from '@/resources/api/customer'
import { reportApi } from '@/resources/api/report'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import { businessIntelligenceApi } from '@/resources/api/businessIntelligence'

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
    promotionEvaluation: promotionEvaluation.data,
    cashbackEvaluation: cashbackEvaluation.data,
    creditEvaluation: creditEvaluation.data,
    retentionRate: retentionRate.data,
    churnRate: churnRate.data,
  }
}

export const getFinancialEvaluations = async (periodType: reportPeriodType) => {
  const cashbackEvaluation = await repApi.getCashbackFinancialEvaluation(
    periodType
  )

  const promotionEvaluation = await repApi.getPromotionFinancialEvaluation(
    periodType
  )

  const creditEvaluation = await repApi.getCreditFinancialEvaluation(periodType)

  return {
    cashbackEvaluation,
    promotionEvaluation,
    creditEvaluation,
  }
}
