import { type brandList } from '@/core/types/brand.type'
import { api } from '../api/index'

const pageUrl = 'product'
type BrandResponse = brandList
const brandListGet = async (): Promise<BrandResponse> => {
  const res = await api.get(`${pageUrl}/brand/`)
  return res.data
}

export const brandsApi = () => {
  return {
    brandListGet,
  }
}
