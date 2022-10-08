import { api } from './index'
import { creditsList } from '../../core/types/credits.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'credit'
type response = {
  data: creditsList
  errors: error
}

const creditsListGet = async (
  page?: number,
  pageSize?: number
): Promise<response> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const creditsGroupListGet = async (
  id: { groupId: string }[],
  page: number,
  pageSize: number
): Promise<response> => {
  let gpID = ''
  for (let i = 0; i < id.length; i++) {
    gpID += `GroupIds=${id[i].groupId}`
    if (i < id.length - 1) gpID += '&'
  }
  const res = await api.get(
    `customer/group?${gpID}&Page=${page}&PageSize=${pageSize}`
  )
  return res.data
}

export const creditsApi = () => {
  return {
    get: creditsListGet,
    getGroup: creditsGroupListGet,
  }
}
