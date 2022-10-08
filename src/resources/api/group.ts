import { api } from './index'
import { group } from '@/core/types/group.type'
import { AxiosError, AxiosResponse } from 'axios'

const pageUrl = 'group'

type response<T> = {
  data?: AxiosResponse<T>
  error?: AxiosError<T>
}

const groupPost = async (groupData: group): Promise<response<group>> => {
  try {
    return await api.post(pageUrl, groupData)
  } catch (e) {
    return e as response<group>
  }
}

const groupPreviewPost = async (
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
  const preview = '/customer'
  try {
    return {
      data: await api.post(pageUrl + preview, groupData),
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
})
