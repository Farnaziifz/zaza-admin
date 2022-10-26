import { api } from './index'
import { discountsList, discounts } from '../../core/types/discounts.type'
import { error } from '../../core/types/error.type'
import { AxiosError, AxiosResponse } from 'axios'

const pageUrl = 'promotion'
type responses = {
  data: discountsList
  errors: error
}

type detaislRes = {
  data: discounts
  errors: error
}
type response<T> = {
  data?: AxiosResponse<T>
  error?: AxiosError<T>
}

const discountListGet = async (
  page?: number,
  pageSize?: number
): Promise<responses> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const chnageDiscountStatus = async (data: string) => {
  const path = '/status'
  const res = await api.put(pageUrl + path + '/' + data)
  return res
}

const deleteDiscount = async (data: string): Promise<responses> => {
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

const discountAdd = async (
  discountData: discounts
): Promise<{
  data?: {
    title: string
    code: string
    type: string
  }
  error?: { message: string }
}> => {
  try {
    return {
      data: await api.post(pageUrl, discountData),
    }
  } catch (e) {
    return {
      error: e as AxiosError<{ data: undefined; error?: AxiosError }>,
    }
  }
}
export const discountApi = () => {
  return {
    get: discountListGet,
    put: chnageDiscountStatus,
    delete: deleteDiscount,
    post: discountAdd,
    getDetails: getDiscountDetails,
    getGroup: getDiscountGroup,
    getGroupDetails: getDiscountGroupDetails,
    checkCodeValidation: checkDiscountValidation,
    generateCode: generateCode,
  }
}
