import { reportApi } from '@/resources/api/report'
import { customerApi } from '@/resources/api/customer'

const api = reportApi()
const csApi = customerApi()

export const initHandler = async () => await api.getReportPromotionUsage()

export const getPromotionReport = async (page: number) =>
  await api.getReportPromotionUsage(page)

export const getTargetCustomerList = async (
  groupIds: string[],
  page: number
) => {
  const q = groupIds.reduce((acc, cur) => {
    return acc + `&GroupIds=${cur}`
  }, '')

  return await csApi.getCustomerListByMultipleGroupIds(q ?? '', page)
}
    
