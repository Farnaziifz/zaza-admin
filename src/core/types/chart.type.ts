import { chartVariant } from '@/core/enums/chartType.enum'

export type chartProps = {
  chartType: chartVariant
  customId?: string
  dataSetIdKey?: string
  width?: number
  height?: number
  cssClasses?: string
  plugins?: string
  chartData: {
    labels?: string[]
    dataset?: [{ data: string[] | number[] }]
  } & object
  chartOptions: { responsive?: boolean } & object
}
