import { scoreType } from '../enums/scoreType.enum'

export type score = {
  type?: scoreType
  unit: number
  amount: number
  isActive: boolean
}
