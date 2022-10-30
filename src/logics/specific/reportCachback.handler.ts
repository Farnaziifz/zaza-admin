import { reportApi } from '@/resources/api/report'

const api = reportApi()

export const getReportCachbackStatisticOverall = async () =>
  await api.getReportCachbackStatistic()
