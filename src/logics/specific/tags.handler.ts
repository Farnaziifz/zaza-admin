import { tagsApi } from '@/resources/api/tags'
import { type tagList } from '@/core/types/tags.type'

const api = tagsApi()

export const initPageHandler = async (): Promise<tagList> => {
  const res = await api.tagListGet()

  return res
}
