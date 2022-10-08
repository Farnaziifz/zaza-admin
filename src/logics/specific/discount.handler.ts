import { discountApi } from '@/resources/api/discount'
import {
  discountsList,
  discountCustomerGroup,
  discountGroup,
} from '@/core/types/discounts.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = discountApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<discountsList> => {
  const res = await api.get(page, pageSize)
  const discount = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return discount
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const chnageDiscountStatus = async (data: string) => {
  const res = await api.put(data)
  showLoadingMessage()
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const deleteDiscount = async (data: string) => {
  await api.delete(data)
}

export const getDiscountDetails = async (data: string) => {
  const res = await api.getDetails(data)
  const discount = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return discount
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const getDiscoutGroup = async (
  data: [],
  page?: number,
  pageSize?: number
): Promise<discountCustomerGroup> => {
  const res = await api.getGroup(data, page, pageSize)
  const discountGroupList = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return discountGroupList
  else {
    showErrorMessage()
    throw 'errors'
  }
}

export const getDiscoutGroupDetails = async (
  data: { groupId: string }[],
  page: 1,
  pageSize: 10
): Promise<discountGroup> => {
  const res = await api.getGroupDetails(data, page, pageSize)
  const discountGroupList = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return discountGroupList
  else {
    showErrorMessage()
    throw 'errors'
  }
}