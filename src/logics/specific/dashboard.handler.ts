import { customerApi } from '@/resources/api/customer'
import { reportApi } from '@/resources/api/report'

const api = customerApi()
const repApi = reportApi()

export const initHandler = async () => {
  const degreeLabelOverallStatistics =
    await api.getCustomerDegreeLabelOverallStatistics()

  const orderOverallStatistics = await api.getCustomerOrderOverallStatistics()

  const overallStatistics = await repApi.getDashboardStatisticsOverall()

  return {
    degreeLabelOverallStatisticsData: degreeLabelOverallStatistics.data,
    orderOverallStatistics: orderOverallStatistics.data,
    reportOverallStatistics: overallStatistics.data,
  }
}
