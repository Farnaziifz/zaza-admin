import { degreeApi } from '@/resources/api/degree'
import { degree } from '@/core/types/degree.type'
import { showMessageToUser } from '@/logics/shared/message.handler'

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
  showMessageToUser({
    content: 'درحال ارسال دیتا',
    type: 'loading',
    messageKey: 1,
  })
  const res = await api.put(data)
  if (res.status === 204) {
    showMessageToUser({
      content: 'موفقیت آمیز',
      type: 'success',
      messageKey: 1,
      duration: 5,
    })
  } else {
    showMessageToUser({
      content: 'ناموفق',
      type: 'error',
      messageKey: 1,
      duration: 5,
    })
  }
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
