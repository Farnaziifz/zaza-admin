import { api } from './index'
import { coupons, couponsList } from '../../core/types/coupons.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'coupon'
type response = {
  data: couponsList
  errors: error
}
type detaislRes = {
  data: coupons
  errors: error
}
const coupunsListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const changeCouponsStatus = async (data: string): Promise<response> => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res.data
}

const deletCoupons = async (data: string): Promise<response> => {
  const res = await api.delete(`${pageUrl}/${data}`)
  return res.data
}

const getCouponDetails = async (data: string): Promise<detaislRes> => {
  const res = await api.get(`${pageUrl}/${data}`)
  return res.data
}
export const couponsApi = () => {
  return {
    get: coupunsListGet,
    put: changeCouponsStatus,
    delete: deletCoupons,
    getDetails: getCouponDetails,
  }
}
