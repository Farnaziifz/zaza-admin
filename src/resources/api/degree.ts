import { api } from './index'
import { response } from '@/core/types/apiResponse.type'
import { degree } from '@/core/types/degree.type'

const pageUrl = 'degree'

const degreeGet = async (): Promise<response<degree>> => {
  const res = await api.get(pageUrl)
  return res.data
}

export const degreePut = async (degreeData: degree) => {
  try {
    return await api.put(pageUrl, degreeData)
  } catch (e) {
    return { status: -1 }
  }
}

export const degreeStatusPut = async () => {
  const status = '/status'
  try {
    return await api.put(pageUrl + status)
  } catch (e) {
    return { status: -1 }
  }
}

export const degreeApi = () => {
  return {
    get: degreeGet,
    put: degreePut,
    statusPut: degreeStatusPut,
  }
}
