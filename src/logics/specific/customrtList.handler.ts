import { customerApi } from '@/resources/api/customer'
import { customerList } from '@/core/types/customer.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = customerApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<customerList> => {
  const res = await api.get(page, pageSize)
  const customer = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return customer
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const chnageCustomerStatus = async (data: string) => {
  showLoadingMessage()
  const res = await api.put(data)
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const getCustomerProfile = async (data: string) => {
  const res = await api.customerProfileGet(data)
  const customer = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return customer
  else {
    showErrorMessage()
    throw 'error'
  }
}
