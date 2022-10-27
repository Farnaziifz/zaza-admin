import { commentApi } from '@/resources/api/comments'
import { commentList } from '@/core/types/comments.type'
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
