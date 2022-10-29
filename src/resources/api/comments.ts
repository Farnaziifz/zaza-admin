import { api } from './index'
import {
  commentList,
  comments,
  detailComment,
} from '@/core/types/comments.type'
import { error } from '../../core/types/error.type'
import { makeARequest } from '@/logics/shared/apiResponse.handler'

const pageUrl = 'feedback'

type responses = {
  data: commentList
  errors: error
}
type singleComment = {
  data: comments
  errors: error
}

type detailsResponse = {
  data: detailComment
  errors: error
}
const getFeedbackList = async (
  page?: number,
  pageSize?: number
): Promise<responses> => {
  const res = await api.get(`${pageUrl}?Page=${page}&PageSize=${pageSize}`)
  return res.data
}

const getFeedbackMainInfo = async (id: string, orderId: string) =>
  await makeARequest<comments>(api.get, `${pageUrl}/${id}/order/${orderId}`)

const getDetailsComment = async (id: string) =>
  await makeARequest<detailsResponse>(api.get, `${pageUrl}/${id}`)

export const commentApi = () => {
  return {
    getFeedbackList,
    getFeedbackMainInfo,
    getDetailsComment,
  }
}
