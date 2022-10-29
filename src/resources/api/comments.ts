import { api } from './index'
import { commentList } from '@/core/types/comments.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'feedback'

type responses = {
  data: commentList
  errors: error
}

const getFeedbackList = async (
  page?: number,
  pageSize?: number
): Promise<responses> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

export const commentApi = () => {
  return {
    getFeedbackList,
  }
}
