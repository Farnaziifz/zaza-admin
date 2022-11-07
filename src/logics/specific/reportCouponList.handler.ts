import { reportApi } from '@/resources/api/report'
import { queryList } from '@/logics/shared/queryBuilder'

const api = reportApi()

export const initHandler = async () => await api.getReportCouponUsage()

export const getCoupons = async (page: number, queries?: queryList) =>
  await api.getReportCouponUsage(page, queries)
