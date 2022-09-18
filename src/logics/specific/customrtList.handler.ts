import { customerApi } from '../../resources/api/customer'
import { customerList } from '../../core/types/customer.type'
import { error } from '../../core/types/error.type'

const api = customerApi()

export const initPageHandler = async (): Promise<customerList | error> => {
  const res = await api.get()
  const customer = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return customer
  else {
    return errors
  }
}
