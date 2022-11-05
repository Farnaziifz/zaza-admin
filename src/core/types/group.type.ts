import { query } from '@/core/types/query.type'
import { pagination } from '@/core/types/pagination.type'

export type groupItemTitle = {
  groupId: string
  title: string
  customersCount: number
}

export type groupTitle = {
  items?: groupItemTitle[]
} & pagination

export type group = {
  from?: string | Date | null
  to?: string | Date | null
  queries: query[]
  title: string
}

export type groups = {
  groupId?: string
  customersCount: number
  isActive: boolean
  title: string
}

export type groupList = {
  items: groups[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
