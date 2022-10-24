// import { CouponsTypesType, CouponsRewardsType } from '../enums/couponsType.enum'
import { pagination } from '@/core/types/pagination.type'

export type discountReport = {
  title?: string
  code?: string
  successRate?: number
  cost?: number
  income?: number
  customerCount?: number
  groupsTitle?: string[]
  groupsId?: string[]
}

export type promotionUsageReport = {
  items: discountReport[]
} & pagination

export type group = {
  groupId: string
  title: string
  customersCount: number
}
type promotionStep = {
  order?: number
  amount?: number
}
export type discounts = {
  id: string
  title: string
  type: string
  consumeType: string
  stateType: string
  amount: number
  code?: string
  consumeLimitation?: number
  startAt: string
  expireAt: string
  notificationType?: string[]
  customersCount: number
  promotionAssignedGroups?: group[]
  maximumAmount?: number
  promotionSteps?: promotionStep[]
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

export type discountCustomer = {
  fullName: string
  mobileNumber: number
}
export type discountCustomerGroup = {
  items: discountCustomer[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
