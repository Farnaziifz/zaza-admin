import { couponsApi } from '../../resources/api/coupons'
import { couponsList, coupons } from '../../core/types/coupons.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { useCouponStore } from '@/resources/store/coupon.store'
import { goToPath } from '@/logics/shared/route.handler'

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

export const saveCouponDataFirstStep = (coupon: coupons) => {
  const couponStore = useCouponStore()
  couponStore.changeCouponSettings(coupon)
  goToPath('/coupons/add/second-step')
}

export const newCouponAdd = async (data: coupons) => {
  const res = await api.post(data)
  showLoadingMessage()
  if (res.data?.status === 204) {
    showSuccessMessage()
    goToPath('/coupons/list')
  } else showErrorMessage(res.error?.response?.statusText)
}
