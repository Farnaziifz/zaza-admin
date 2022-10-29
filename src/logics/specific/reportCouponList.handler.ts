import { reportApi } from '@/resources/api/report'

const api = reportApi()

export const initHandler = async () => await api.getReportCouponUsage()

export const getCoupons = async (page: number) =>
  await api.getReportCouponUsage(page)
