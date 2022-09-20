import { api } from './index'
import { copounsList } from '../../core/types/copouns.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'coupon'
type response = {
  data: copounsList
  errors: error
}

const coupunsListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const changeCopounsStatus = async (data: string): Promise<response> => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res.data
}

export const copounsApi = () => {
  return {
    get: coupunsListGet,
    put: changeCopounsStatus,
  }
}
