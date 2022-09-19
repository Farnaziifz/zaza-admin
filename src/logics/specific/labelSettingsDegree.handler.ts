import { degreeApi } from '../../resources/api/degree'
import { degree } from '../../core/types/degree.type'

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
  await api.put(data)
}

export const changeServerStatusHandler = async () => {
  await api.statusPut()
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