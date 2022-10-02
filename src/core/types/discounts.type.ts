// import { CouponsTypesType, CouponsRewardsType } from '../enums/couponsType.enum'
export type group = {
  title: string
  customersCount: number
  groupId: string
}
export type discounts = {
  title: string
  type: string
  consumeType: string
  stateType: string
  amount: number
  startAt: string
  expireAt: string
  customersCount: number
  promotionAssignedGroups: [],
  groupIds: []
  promotionSteps?: {
    order?: number
    amount?: number
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

export type discountGroup = {
  items: group[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
