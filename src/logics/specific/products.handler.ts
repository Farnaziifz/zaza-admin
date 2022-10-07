import { productApi } from '@/resources/api/product'
import { productsList } from '@/core/types/product.type'
import { showErrorMessage } from '@/logics/shared/message.handler'

const api = productApi()

export const getProductList = async (
  page?: number,
  pageSize?: number
): Promise<productsList> => {
  const res = await api.get(page, pageSize)
  const products = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return products
  else {
    showErrorMessage()
    throw 'error'
  }
}
