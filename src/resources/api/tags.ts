import { type tagList } from '@/core/types/tags.type'
import { api } from '../api/index'

const pageUrl = 'product'
type TagResponse = tagList

const tagListGet = async (): Promise<TagResponse> => {
  const res = await api.get(`${pageUrl}/tag/`)
  return res.data
}

export const tagsApi = () => {
  return {
    tagListGet,
  }
}
