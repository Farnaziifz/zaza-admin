import {customerType} from "@/core/enums/customerType.enum";
import {pagination} from "@/core/types/pagination.type";

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

export type retentionRateCustomerList = {
  items: retentionRateCustomer[]
} & pagination

export type churnRate = {
  loseWeekCount: number
  lazyWeekCount: number
}
