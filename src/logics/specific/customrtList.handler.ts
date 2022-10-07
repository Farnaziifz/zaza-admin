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

export const getCustomerPayment = async (
  data: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.customerPaymentGet(data, page, pageSize)
  const customerPayment = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return customerPayment
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerComment = async (
  data: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.customerCommentGet(data, page, pageSize)
  const customerComment = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return customerComment
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerGroup = async (data: string) => {
  const res = await api.customerGroupListGet(data)
  const customerGroup = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return customerGroup
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerCommentDetails = async (cId: string, fId: string) => {
  const res = await api.customerCommentDetailsGet(cId, fId)
  const commentDetails = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return commentDetails
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerCommentOrderDetails = async (
  cId: string,
  oId: string
) => {
  const res = await api.customerCommentOrderDetailsGet(cId, oId)
  const commentOrderDetails = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return commentOrderDetails
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const getCustomerScoreList = async (
  id: string,
  page?: number,
  pageSize?: number
) => {
  const res = await api.customerScoreListGet(id, page, pageSize)
  const customerScore = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return customerScore
  else {
    showErrorMessage()
    throw 'error'
  }
}
