import { api } from './index'
import { customerList } from '../../core/types/customer.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'customer'
type response = {
  data: customerList
  errors: error
}

const cusotmerListGet = async (): Promise<response> => {
  const res = await api.get(pageUrl)
  return res.data
}

export const customerApi = () => {
  return {
    get: cusotmerListGet,
  }
}
