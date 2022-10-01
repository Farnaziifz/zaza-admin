import { discountApi } from '@/resources/api/discount'
import { discountsList } from '@/core/types/discounts.type'
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
