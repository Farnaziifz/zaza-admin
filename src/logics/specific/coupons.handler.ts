import { copounsApi } from '../../resources/api/coupons'
import { couponsList } from '../../core/types/coupons.type'

const api = copounsApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<couponsList> => {
  const res = await api.get(page, pageSize)
  const copouns = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return copouns
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const changeCopounsStatus = async (data: string) => {
  await api.put(data)
}

export const deleteCopouns = async (data: string) => {
  await api.delete(data)
}

export const getCouponDetails = async (data: string) => {
  const res = await api.getDetails(data)
  const copoun = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return copoun
  else {
    // TODO: error handling
    throw 'errors'
  }
}
