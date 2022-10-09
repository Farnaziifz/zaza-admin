import { api } from './index'
import { group } from '@/core/types/group.type'
import { AxiosError, AxiosResponse } from 'axios'

const pageUrl = 'group'

type response<T> = {
  data?: AxiosResponse<T>
  error?: AxiosError<T>
}

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
})
