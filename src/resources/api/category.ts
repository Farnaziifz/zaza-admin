import { type categoryList } from '@/core/types/category.type'
import { api } from '../api/index'

const pageUrl = 'category'

type categoryResponse = categoryList

const categoryListGet = async (): Promise<categoryResponse> => {
  const res = await api.get(`${pageUrl}/category/?for_admin=true`)
  return res.data
}

const addcategory = async (model: FormData) => {
  const res = await api.post(`${pageUrl}/category/?for_admin=true`, model)
  return res.data
}

const getcategory = async (id: string | number) => {
  const res = await api.get(`${pageUrl}/category/${id}/?for_admin=true`)
  return res.data
}

const updatecategory = async (id: string, model: FormData) => {
  const res = await api.put(`${pageUrl}/category/${id}?for_admin=true`, model)
  return res.data
}

export const categorysApi = () => {
  return {
    categoryListGet,
    addcategory,
    getcategory,
    updatecategory,
  }
}
