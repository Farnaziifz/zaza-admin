import { OrderLabelType, DegreeLabelType } from '../enums/customerType.enum'

export type customer = {
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
