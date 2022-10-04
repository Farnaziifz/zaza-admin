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

const customerProfileGet = async (id: string) => {
  const res = await api.get(`${pageUrl}/profile/${id}`)
  return res.data
}
const customerWalletGet = async (id: string) => {
  const res = await api.get(`${pageUrl}/${id}/wallet-balance`)
  return res.data
}
const customerWalletTransaction = async (
  id: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.get(
    `${pageUrl}/${id}/transaction-history?Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}
const customerOrderGet = async (
  id: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.get(
    `${pageUrl}/${id}/order?Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}

const customerPaymentList = async (
  id: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.get(
    `${pageUrl}/${id}/payment?Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}

const customerCommentList = async (
  id: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.get(
    `${pageUrl}/${id}/feedback?Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}

export const customerApi = () => {
  return {
    get: cusotmerListGet,
    put: customerChangeSatatus,
    customerProfileGet: customerProfileGet,
    customerWalletGet: customerWalletGet,
    customerTransactionWalletGet: customerWalletTransaction,
    customerOrderGet: customerOrderGet,
    customerPaymentGet: customerPaymentList,
    customerCommentGet: customerCommentList,
  }
}
