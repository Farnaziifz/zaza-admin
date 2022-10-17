import { pagination } from '@/core/types/pagination.type'

type group = {
  groupId: ''
  groupTitle: ''
}
export type creditTitleList = {
  groupIds: string[]
  title: string
  customersCount: number
  amount: number
}

export type credit = {
  id?: string
  amount: number
  hasPeriod?: boolean
  startAt?: Date | string
  expireAt?: Date | string
  creditGroups?: { groupId: string }[]
  groups?: { groupId: string }[]
  groupIds?: string[]
}

export type credits = {
  amount: number
  startAt: string
  expireAt: string
  groups: group[]
  fullName: string
  mobileNumber: number
}

export type creditsList = {
  items: credits[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}

export type creditCustomer = {
  fullName: string
  mobileNumber: number
}
export type creditCustomerGroup = {
  items: creditCustomer[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
