import { CouponsTypesType, CouponsRewardsType } from '../enums/couponsType.enum'

export type coupons = {
  id: string,
  title: string
  type: string | CouponsTypesType
  reward: string | CouponsRewardsType
  createdAt: string
  value?: {
    title?: string
    amount?: number
  }
  rewardValue?: {
    amount?: number
    title?: string
    discountMaximumPrice?: number
    discountPercentage?: number
  }
  isActive: boolean
}

export type couponsList = {
  items: coupons[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
