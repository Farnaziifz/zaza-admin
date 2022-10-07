import { query } from '@/core/types/query.type'

export type group = {
  from: string | Date | null
  to: string | Date | null
  queries: query[]
  title: string
}