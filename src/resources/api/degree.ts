import { api } from './index'
import { response } from '../../core/types/apiResponse.type'
import { degree } from '../../core/types/degree.type'

const pageUrl = 'degree'

const degreeGet = async (): Promise<response<degree>> => {
  const res = await api.get(pageUrl)
  return res.data
}

export const degreePut = async (degreeData: degree) => {
  await api.put(pageUrl, degreeData)
}

export const degreeStatusPut = async () => {
  const status = '/status'
  await api.put(pageUrl + status)
}

export const degreeApi = () => {
  return {
    get: degreeGet,
    put: degreePut,
    statusPut: degreeStatusPut,
  }
}
