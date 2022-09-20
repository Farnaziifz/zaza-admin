import { degreeApi } from '@/resources/api/degree'
import { degree } from '@/core/types/degree.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = degreeApi()

export const initPageHandler = async (): Promise<degree> => {
  const res = await api.get()
  const degree = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return degree
  else {
    throw 'error'
  }
}

export const changeServerDataHandler = async (data: degree) => {
  showLoadingMessage()
  const res = await api.put(data)
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const changeServerStatusHandler = async () => {
  showLoadingMessage()
  const res = await api.statusPut()
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const updatePageHandler = async () => {
  const res = await api.get()
  const degree = res.data
  const errors = res.errors

  if (Object.is(errors, null)) return degree
  else {
    throw 'error'
  }
}
