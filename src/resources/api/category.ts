import { api } from './index'
import { categoryList } from '../../core/types/category.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'category'
type response = {
  data: categoryList
  errors: error
}

const categoryListGet = async (
  page?: number,
  pageSize?: number,
  id?: string
): Promise<response> => {
  console.log(id)
  const res = await api.get(
    `${pageUrl}?Page=${page}&PageSize=${pageSize}&Id=${id}`
  )
  return res.data
}

export const categoryApi = () => {
  return {
    get: categoryListGet,
  }
}
