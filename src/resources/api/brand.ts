import { type brandList } from '@/core/types/brand.type'
import { api } from '../api/index'

const pageUrl = 'product'
type BrandResponse = brandList
const brandListGet = async (): Promise<BrandResponse> => {
  const res = await api.get(`${pageUrl}/brand/?for_admin=true`)
  return res.data
}

const addBrand = async (model: FormData) => {
  const res = await api.post(`${pageUrl}/brand/?for_admin=true`, model)
  return res.data
}

export const brandsApi = () => {
  return {
    brandListGet,
    addBrand,
  }
}
