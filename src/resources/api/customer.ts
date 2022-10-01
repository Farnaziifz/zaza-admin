import { api } from './index'
import { customerList } from '../../core/types/customer.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'customer'
type response = {
  data: customerList
  errors: error
}

const cusotmerListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const customerChangeSatatus = async (data: string) => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res
}

export const customerApi = () => {
  return {
    get: cusotmerListGet,
    put: customerChangeSatatus,
  }
}
