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

export type customerOrder = {
  trackingCode: string
  createdAt: string
  finalPrice: number
}

export type customerOrderList = {
  items: customerOrder[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type customerPayment = {
  createdAt: string
  type: string
  amount: number
  isPaid: boolean
  trackingCode: string
}

export type customerPaymentList = {
  items: customerPayment[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type customerComment = {
  trackingCode: string
  rate: number
  comment: string
  createdAt: string
}

export type customerCommentList = {
  items: customerComment[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type customerGroup = {
  title: string
}

export type customerGroupList = customerGroup[]

export type customerCommentDetails = {
  id: string
  parentId?: string
  rate: number
  comment: string
  productTitle: string
  createdAt: string
}

export type customerCommentDetailsList = customerCommentDetails[]

export type customerOrderDetails = {
  createdAt: string
  finalPrice: number
  trackingCode: string
  products: { id: string; count: number; price: number; title: string }[]
}

export type customerScore = {
  type: string
  unit: number
  amount: number
  createdAt: string
}

export type customerScoreList = {
  items: customerScore[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
