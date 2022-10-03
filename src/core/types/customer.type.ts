import {
  OrderLabelType,
  DegreeLabelType,
  transactionType,
} from '../enums/customerType.enum'

export type customer = {
  id: string
  fullName: string
  createdAt: number
  numberOfOrder: number
  totalExpenses: number
  value: number
  orderLabel: string | null | OrderLabelType
  DegreeLabel: string | null | DegreeLabelType
  isActive: boolean
}

export type customerList = {
  items: customer[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type walletBalance = {
  amount: number
}

export type transactionHistory = {
  type: string | null | transactionType
  amount: number
}

export type transactionHistoryList = {
  items: transactionHistory[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
