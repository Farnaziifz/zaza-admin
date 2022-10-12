import { cashbackType, durationTypeEnum } from '@/core/enums/cashback.enum'

export type cashback = {
  amount: number
  minimumAmount: number
  maximumPrice: number
  type?: cashbackType
  durationType?: durationTypeEnum
  duration: number
  isActive: boolean
}
