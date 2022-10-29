import { commentApi } from '@/resources/api/comments'
import { commentList, comments } from '@/core/types/comments.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = commentApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<commentList> => {
  const res = await api.getFeedbackList(page, pageSize)
  const commnets = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return commnets
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const commentMainInfo = async (id: string, orderId: string) => {
  const res = await api.getFeedbackMainInfo(id, orderId)
  const info = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return info
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const commentMainInfoRefactor = async (id: string, orderId: string) =>
  await api.getFeedbackMainInfo(id, orderId)

export const getCommentDetails = async (id: string) =>
  await api.getDetailsComment(id)
