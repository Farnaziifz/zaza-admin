import { api } from './index'
import { coupons, couponsList } from '../../core/types/coupons.type'
import { error } from '../../core/types/error.type'
import { AxiosError, AxiosResponse } from 'axios'

const pageUrl = 'coupon'
type responses = {
  data: couponsList
  errors: error
}
type detaislRes = {
  data: coupons
  errors: error
}
type response<T> = {
  data?: AxiosResponse<T>
  error?: AxiosError<T>
}
const coupunsListGet = async (
  page?: number,
  pageSize?: number
): Promise<responses> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const changeCouponsStatus = async (data: string) => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res
}

const deletCoupons = async (data: string) => {
  const res = await api.delete(`${pageUrl}/${data}`)
  return res
}

const getCouponDetails = async (data: string): Promise<detaislRes> => {
  const res = await api.get(`${pageUrl}/${data}`)
  return res.data
}

const couponAdd = async (
  couponData: coupons
): Promise<
  response<{
    data?: {
      title: string
      type: string
      reward: string
    }
    error?: { message: string }
  }>
> => {
  try {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data: await api.post(pageUrl, couponData),
    }
  } catch (e) {
    return {
      error: e as AxiosError<{ data: undefined; error?: AxiosError }>,
    }
  }
}
export const couponsApi = () => {
  return {
    get: coupunsListGet,
    put: changeCouponsStatus,
    delete: deletCoupons,
    getDetails: getCouponDetails,
    post: couponAdd,
  }
}
