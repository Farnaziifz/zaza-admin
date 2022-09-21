import { couponsApi } from '../../resources/api/coupons'
import { couponsList } from '../../core/types/coupons.type'

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
  await api.put(data)
}

export const deleteCoupons = async (data: string) => {
  await api.delete(data)
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
