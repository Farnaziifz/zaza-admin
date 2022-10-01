import { api } from './index'
import { discountsList } from '../../core/types/discounts.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'promotion'
type response = {
  data: discountsList
  errors: error
}

const discountListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const chnageDiscountStatus = async (data: string) => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res
}

const deleteDiscount = async (data: string): Promise<response> => {
  const res = await api.delete(`${pageUrl}/${data}`)
  return res.data
}
export const discountApi = () => {
  return {
    get: discountListGet,
    put: chnageDiscountStatus,
    delete: deleteDiscount,
  }
}
