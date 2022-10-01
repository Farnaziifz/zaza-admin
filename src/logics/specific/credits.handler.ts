import { creditsApi } from '../../resources/api/credits'
import { creditsList, creditCustomerGroup } from '../../core/types/credits.type'

const api = creditsApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<creditsList> => {
  const res = await api.get(page, pageSize)
  const credits = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return credits
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const getCustomerGroup = async (
  data: { groupId: string }[],
  page = 1,
  pageSize = 10
): Promise<creditCustomerGroup> => {
  const res = await api.getGroup(data, page, pageSize)
  const customerGroupList = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return customerGroupList
  else {
    // TODO: error handling
    throw 'errors'
  }
}
