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

export const getCustomerWallet = async (data: string) => {
  const res = await api.customerWalletGet(data)
  const walletBalance = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return walletBalance
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerWalletTransaction = async (
  data: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.customerTransactionWalletGet(data, page, pageSize)
  const walletTransaction = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return walletTransaction
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerOrder = async (
  data: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.customerOrderGet(data, page, pageSize)
  const customerOrder = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return customerOrder
  else {
    showErrorMessage()
    throw 'error'
  }
}
