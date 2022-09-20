import { CopounsTypesType, CopunsRewardsType } from '../enums/couponsType.enum'

export type copouns = {
  title: string
  type: string | null | CopounsTypesType
  reward: string | null | CopunsRewardsType
  createdAt: string
  value?: string
  rewardValue?: string
  isActive: boolean
}

export type copounsList = {
  items: copouns[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
