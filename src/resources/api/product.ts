import { api } from './index'
import { productsList } from '../../core/types/product.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'product'
type response = {
  data: productsList
  errors: error
}

const productListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

export const productApi = () => {
  return {
    get: productListGet,
  }
}
