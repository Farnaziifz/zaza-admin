import { query } from '@/core/types/query.type'
import { pagination } from '@/core/types/pagination.type'

export type groupTitle = {
  items?: {
    groupId: string
    title: string
    customerCount: number
  }[]
} & pagination

export type group = {
  from: string | Date | null
  to: string | Date | null
  queries: query[]
  title: string
}
