import { creditsApi } from '../../resources/api/credits'
import { creditsList, creditCustomerGroup } from '../../core/types/credits.type'

const api = creditsApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<creditsList> => {
  const res = await api.get(page, pageSize)
  const credits = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return credits
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const getCustomerGroup = async (
  data: string,
  page?: number,
  pageSize?: number
): Promise<creditCustomerGroup> => {
  const res = await api.getGroup(data, page, pageSize)
  const customerGroupList = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return customerGroupList
  else {
    // TODO: error handling
    throw 'errors'
  }
}

// export const changeCouponsStatus = async (data: string) => {
//   await api.put(data)
// }

// export const getCouponDetails = async (data: string) => {
//   const res = await api.getDetails(data)
//   const coupon = res.data

//   const errors = res.errors

//   if (Object.is(errors, null)) return coupon
//   else {
//     // TODO: error handling
//     throw 'errors'
//   }
// }
