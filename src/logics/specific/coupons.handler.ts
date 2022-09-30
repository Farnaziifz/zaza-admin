import { couponsApi } from '../../resources/api/coupons'
import { couponsList } from '../../core/types/coupons.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = couponsApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<couponsList> => {
  const res = await api.get(page, pageSize)
  const coupons = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return coupons
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const changeCouponsStatus = async (data: string) => {
  const res = await api.put(data)
  showLoadingMessage()
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const deleteCoupons = async (data: string) => {
  const res = await api.delete(data)
  showLoadingMessage()
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const getCouponDetails = async (data: string) => {
  const res = await api.getDetails(data)
  const coupon = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return coupon
  else {
    // TODO: error handling
    throw 'errors'
  }
}
