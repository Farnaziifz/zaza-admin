import { api } from './index'
import { score } from '@/core/types/score.type'
import { makeARequest } from '@/logics/shared/apiResponse.handler'

const pageUrl = 'score'
const status = '/status'

const scorePut = async (data: score) =>
  makeARequest<score>(api.put, pageUrl, data)

const scoreGet = async () => makeARequest<score>(api.get, pageUrl)

const scoreStatusPut = async () => makeARequest(api.put, pageUrl + status)

export const scoreApi = () => {
  return {
    get: scoreGet,
    put: scorePut,
    putStatus: scoreStatusPut,
  }
}
