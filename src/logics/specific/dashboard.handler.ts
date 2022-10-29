import { customerApi } from '@/resources/api/customer'

const api = customerApi()

export const initHandler = async () => {
  const degreeLabelOverallStatistics =
    await api.getCustomerDegreeLabelOverallStatistics()

  const orderOverallStatistics = await api.getCustomerOrderOverallStatistics()

  return {
    degreeLabelOverallStatistics: degreeLabelOverallStatistics.data,
    orderOverallStatistics: orderOverallStatistics.data,
  }
}