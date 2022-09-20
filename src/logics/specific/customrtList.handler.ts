import { customerApi } from '@/resources/api/customer'
import { customerList } from '@/core/types/customer.type'
import { showErrorMessage } from '@/logics/shared/message.handler'

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
  await api.put(data)
}
