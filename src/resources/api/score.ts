import { api } from './index'
import { score } from '../../core/types/score.type'
import { error } from '../../core/types/error.type'

const pageUrl = 'score'
type response = {
  data: score
  errors: error
}

const scorePut = async (data: score): Promise<response> => {
  const res = await api.put(pageUrl, data)
  return res.data
}

const scoreGet = async (): Promise<response> => {
  const res = await api.get('score')
  return res.data
}

export const scoreApi = () => {
  return {
    get: scoreGet,
    put: scorePut,
  }
}
