import { query } from '@/core/types/query.type'
import { pagination } from '@/core/types/pagination.type'

export type groupItemTitle = {
  groupId: string
  title: string
  customerCount: number
}

export type groupTitle = {
  items?: groupItemTitle[]
} & pagination

export type group = {
  from: string | Date | null
  to: string | Date | null
  queries: query[]
  title: string
}
