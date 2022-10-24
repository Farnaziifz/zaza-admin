import { reportApi } from '@/resources/api/report'

const api = reportApi()

export const initHandler = async () => await api.getReportPromotionUsage()

export const getPromotionReport = async (page: number) =>
  await api.getReportPromotionUsage(page)
