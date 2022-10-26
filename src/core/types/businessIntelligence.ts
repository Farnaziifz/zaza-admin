import { customerType } from '@/core/enums/customerType.enum'
import { pagination } from '@/core/types/pagination.type'
import { fluxityType } from '@/core/enums/fluxityType.enum'

export type retentionRateOverallStatistics = {
  customerRetentionRate: number
  heroCustomer: number
  loyalCustomer: number
  attentionNeedCustomer: number
  heroCustomerPercentage: number
  loyalCustomerPercentage: number
  attentionNeedCustomerPercentage: number
}

export type retentionRateCustomer = {
  fullName: string
  numberOfOrder: number
  totalExpenses: number
  customerType?: customerType
}

export type churnRateOverallStatistics = {
  lostCustomer: number
  lazyCustomer: number
  normalCustomer: number
  customerChurnRate: number
  lostCustomerPercentage: number
  lazyCustomerPercentage: number
  normalCustomerPercentage: number
}

export type churnRateCustomer = {
  fullName: string
  numberOfOrder: number
  totalExpenses: number
  fluxity?: fluxityType
}

export type churnRateCustomerList = {
  items: churnRateCustomer[]
} & pagination

export type retentionRateCustomerList = {
  items: retentionRateCustomer[]
} & pagination

export type churnRate = {
  loseWeekCount: number
  lazyWeekCount: number
}

export type retentionLoyalityRateOverallStatistics = {
  customerRetentionRate: number
  heroCustomer: number
  loyalCustomer: number
  attentionNeedCustomer: number
  heroCustomerPercentage: number
  loyalCustomerPercentage: number
  attentionNeedCustomerPercentage: number
}
