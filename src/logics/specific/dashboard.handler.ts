import { customerApi } from '@/resources/api/customer'
import { reportApi } from '@/resources/api/report'
import { reportPeriodType } from '@/core/enums/reportType.enum'

const api = customerApi()
const repApi = reportApi()

export const initHandler = async () => {
  const degreeLabelOverallStatistics =
    await api.getCustomerDegreeLabelOverallStatistics()

  const orderOverallStatistics = await api.getCustomerOrderOverallStatistics()

  const overallStatistics = await repApi.getDashboardStatisticsOverall()

  const { cashbackEvaluation, promotionEvaluation, creditEvaluation } =
    await getFinancialEvaluations(reportPeriodType.WEEKLY)

  return {
    degreeLabelOverallStatisticsData: degreeLabelOverallStatistics.data,
    orderOverallStatistics: orderOverallStatistics.data,
    reportOverallStatistics: overallStatistics.data,
    promotionEvaluation: promotionEvaluation.data,
    cashbackEvaluation: cashbackEvaluation.data,
    creditEvaluation: creditEvaluation.data,
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
