import { type tagList } from '@/core/types/tags.type'
import { api } from '../api/index'

const pageUrl = 'product'
type Response = {
  data: tagList
}
const brandListGet = async (): Promise<Response> => {
  const res = await api.get(`${pageUrl}/brand/`)
  return res.data
}

export const brandsApi = () => {
  return {
    brandListGet,
  }
}
