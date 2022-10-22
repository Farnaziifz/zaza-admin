import { api } from './index'
import { group, groupTitle } from '@/core/types/group.type'
import { AxiosError, AxiosResponse } from 'axios'
import { makeARequest } from '@/logics/shared/apiResponse.handler'
import { credit } from '@/core/types/credits.type'

const pageUrl = 'group'
const title = '/title'
const titlePageQuery = '?Page=1&PageSize=10000000'

type response<T> = {
  data?: AxiosResponse<T>
  error?: AxiosError<T>
}

const getGroupTitleById = async (groupIdsQuery: string) =>
  await makeARequest<groupTitle>(api.get, `${pageUrl}${title}/${groupIdsQuery}`)

const groupTitleGet = async () =>
  await makeARequest<groupTitle>(api.get, pageUrl + title + titlePageQuery)

const groupPost = async (
  groupData: group
): Promise<
  response<{
    data?: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      items: any[]
      page: number
      totalCount: number
      totalPages: number
    }
    error?: { message: string }
  }>
> => {
  try {
    return {
      data: await api.post(pageUrl, groupData),
    }
  } catch (e) {
    return {
      error: e as AxiosError<{ data: undefined; error?: AxiosError }>,
    }
  }
}

const groupPreviewPost = async (
  groupData: group,
  paginate: { current: number; pageSize: number }
): Promise<
  response<{
    data?: {
      hasNextPage: boolean
      hasPreviousPage: boolean
      items: any[]
      page: number
      totalCount: number
      totalPages: number
    }
    error?: { message: string }
  }>
> => {
  const preview = '/customer'
  const pagination = `?page=${paginate.current}&pageSize=${paginate.pageSize}`
  try {
    return {
      data: await api.post(pageUrl + preview + pagination, groupData),
    }
  } catch (e) {
    return {
      error: e as AxiosError<{ data: undefined; error?: AxiosError }>,
    }
  }
}

export const groupApi = () => ({
  post: groupPost,
  postPreview: groupPreviewPost,
  getTitle: groupTitleGet,
  getGroupTitle: getGroupTitleById,
})
