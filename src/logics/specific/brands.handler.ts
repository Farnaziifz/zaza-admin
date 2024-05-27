import { brandsApi } from '@/resources/api/brand'
import { brandList } from '@/core/types/brand.type'
const api = brandsApi()

export const initPageHandler = async (): Promise<brandList> => {
  const res = await api.brandListGet()
  return res.data
}
