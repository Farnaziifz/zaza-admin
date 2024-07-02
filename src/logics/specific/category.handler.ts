import { categorysApi } from '@/resources/api/category'
import { categoryList } from '@/core/types/category.type'

const api = categorysApi()

export const initPageHandler = async (): Promise<categoryList> => {
  const res = await api.categoryListGet()

  return res
}

export const addcategory = async (model: FormData) => {
  const res = await api.addcategory(model)
  return res
}

export const getcategory = async (id: string | number) => {
  const res = await api.getcategory(id)
  return res
}

export const updatecategory = async (id: string, model: FormData) => {
  const res = await api.updatecategory(id, model)
  return res
}
