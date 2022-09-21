import { CopounsTypesType, CopunsRewardsType } from '../enums/couponsType.enum'

export type coupons = {
  title: string
  type: string | null | CopounsTypesType
  reward: string | null | CopunsRewardsType
  createdAt: string
  value?: string
  rewardValue?: object
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
