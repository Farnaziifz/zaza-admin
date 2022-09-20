import { copounsApi } from '../../resources/api/copouns'
import { copounsList } from '../../core/types/copouns.type'

const api = copounsApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<copounsList> => {
  const res = await api.get(page, pageSize)
  const copouns = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return copouns
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const changeCopounsStatus = async (data: string) => {
  await api.put(data)
}
