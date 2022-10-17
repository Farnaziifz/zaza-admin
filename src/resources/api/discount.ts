import { api } from './index'
import { discountsList, discounts } from '../../core/types/discounts.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'promotion'
type response = {
  data: discountsList
  errors: error
}

type detaislRes = {
  data: discounts
  errors: error
}

const discountListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const chnageDiscountStatus = async (data: string) => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res
}

const deleteDiscount = async (data: string): Promise<response> => {
  const res = await api.delete(`${pageUrl}/${data}`)
  return res.data
}

const getDiscountDetails = async (data: string): Promise<detaislRes> => {
  const res = await api.get(`${pageUrl}/${data}`)
  return res.data
}

const getDiscountGroup = async (id: [], page?: number, pageSize?: number) => {
  let gpID = ''
  for (let i = 0; i < id.length; i++) {
    gpID += `GroupIds=${id[i]}`
    if (i < id.length - 1) gpID += '&'
  }
  const res = await api.get(
    `customer/group?${gpID}&Page=${page}&PageSize=${pageSize}`
  )

  return res.data
}

const getDiscountGroupDetails = async (
  id: { groupId: string }[],
  page: number,
  pageSize: number
) => {
  let gpID = ''
  for (let i = 0; i < id.length; i++) {
    gpID += `GroupIds=${id[i].groupId}`
    if (i < id.length - 1) gpID += '&'
  }
  const res = await api.get(
    `group/title?${gpID}&Page=${page}&PageSize=${pageSize}`
  )

  return res.data
}

const checkDiscountValidation = async (code: string) => {
  const res = await api.get(`${pageUrl}/code-validation?Code=${code}`)
  return res.data
}
const generateCode = async () => {
  const res = await api.get(`${pageUrl}/generate-random-code`)
  return res.data
}
export const discountApi = () => {
  return {
    get: discountListGet,
    put: chnageDiscountStatus,
    delete: deleteDiscount,
    getDetails: getDiscountDetails,
    getGroup: getDiscountGroup,
    getGroupDetails: getDiscountGroupDetails,
    checkCodeValidation: checkDiscountValidation,
    generateCode: generateCode,
  }
}
