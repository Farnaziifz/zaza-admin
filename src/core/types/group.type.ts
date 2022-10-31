import { query } from '@/core/types/query.type'
import { pagination } from '@/core/types/pagination.type'

type queries = {
  type: string
  value: string
}
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
  from?: string | Date | null
  to?: string | Date | null
  queries?: queries[]
}

export type groupList = {
  items: groups[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
