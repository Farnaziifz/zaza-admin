import { CouponsTypesType, CouponsRewardsType } from '../enums/couponsType.enum'
import { pagination } from '@/core/types/pagination.type'

export type coupons = {
  id?: string
  title: string
  type: string | CouponsTypesType
  reward?: string | CouponsRewardsType
  createdAt?: string
  value?: {
    id?: string[] | string
    title?: string
    amount?: number
  }
  rewardValue?: {
    id?: string
    amount?: number
    title?: string
    discountMaximumPrice?: number
    discountPercentage?: number
  }
  isActive?: boolean
  selectItem?: {
    title?: string
    value?: string
  }
  visit?: number
  numberOfUsed?: number
  selectionRate?: number
}

export type couponsList = {
  items: coupons[]
} & pagination
