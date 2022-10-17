import { api } from './index'
import { credit, creditsList, creditTitleList } from '@/core/types/credits.type'
import { error } from '@/core/types/error.type'
import { makeARequest } from '@/logics/shared/apiResponse.handler'

const pageUrl = 'credit'
type response = {
  data: creditsList
  errors: error
}

const getCreditDetailsById = async (id: string) =>
  await makeARequest<credit>(api.get, `${pageUrl}/${id}`)

const creditPost = async (creditData: credit) =>
  await makeARequest<credit>(api.post, pageUrl, creditData)

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
    post: creditPost,
    get: creditsListGet,
    getGroup: creditsGroupListGet,
    getCreditDetails: getCreditDetailsById,
  }
}
