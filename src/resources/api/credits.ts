import { api } from './index'
import { credits, creditsList } from '../../core/types/credits.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'credit'
type response = {
  data: creditsList
  errors: error
}
// type detaislRes = {
//   data: credits
//   errors: error
// }
const creditsListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const creditsGroupListGet = async (
  id: string,
  page: number,
  pageSize: number
): Promise<response> => {
  const res = await api.get(
    `customer/group?GroupIds=${id}&Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}

// const changeCouponsStatus = async (data: string): Promise<response> => {
//   const path = '/status'
//   const res = await api.put(pageUrl + path + '/' + data)
//   return res.data
// }

// const deletCoupons = async (data: string): Promise<response> => {
//   const res = await api.delete(`${pageUrl}/${data}`)
//   return res.data
// }

// const getCouponDetails = async (data: string): Promise<detaislRes> => {
//   const res = await api.get(`${pageUrl}/${data}`)
//   return res.data
// }
export const creditsApi = () => {
  return {
    get: creditsListGet,
    getGroup: creditsGroupListGet,
    // put: changeCouponsStatus,
    // delete: deletCoupons,
    // getDetails: getCouponDetails,
  }
}
