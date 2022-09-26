// import { CouponsTypesType, CouponsRewardsType } from '../enums/couponsType.enum'

export type discounts = {
  title: string
  type: string
  reward: string
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

export type discountsList = {
  items: discounts[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
