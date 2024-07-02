import { brandsApi } from '@/resources/api/brand'
import { brandList } from '@/core/types/brand.type'
const api = brandsApi()

export const initPageHandler = async (): Promise<brandList> => {
  const res = await api.brandListGet()

  return res
}

export const addBrand = async (model: FormData) => {
  const res = await api.addBrand(model)
  return res
}

export const getBrand = async (id: string | number) => {
  const res = await api.getBrand(id)
  return res
}

export const updateBrand = async (id: string, model: FormData) => {
  const res = await api.updateBrand(id, model)
  return res
}
