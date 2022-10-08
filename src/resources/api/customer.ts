import { api } from './index'
import { customerList } from '../../core/types/customer.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'customer'
type response = {
  data: customerList
  errors: error
}
const getCustomerProfileById = async (id: string) => {
  const profile = '/profile'
  const res = await api.get(pageUrl + profile + `/${id}`)
  return res
}

const cusotmerListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const customerChangeSatatus = async (data: string): Promise<response> => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res.data
}

export const customerApi = () => {
  return {
    get: cusotmerListGet,
    put: customerChangeSatatus,
    getCustomerProfileById,
  }
}
