import { AxiosError, AxiosResponse } from 'axios'
import { showErrorMessage } from '@/logics/shared/message.handler'

type response<T = never> = {
  data?: T
  errors?: {
    message: string
  }
}

const defaultError: response = {
  errors: {
    message: 'ناموفق',
  },
}

export const makeARequest = async <T>(
  apiHandler:
    | (<T>(route: string, data?: T) => Promise<AxiosResponse<response<T>>>)
    | (<T>(route: string) => Promise<AxiosResponse<response<T>>>),
  route: string,
  data?: T
): Promise<response<T>> => {
  try {
    if (data) {
      const res = await apiHandler(route, data)
      return res.data
    } else {
      const res = await apiHandler(route)
      return res.data as response<T>
    }
  } catch (e) {
    const err = e as AxiosError<response<T>>
    return handleError<T>(err)
  }
}

export const handleError = <T>(e: AxiosError<response<T>>): response<T> => {
  handleErrorMessageBroadcasting<T>(e)
  throw e
}

export const handleErrorMessageBroadcasting = <T>(
  e: AxiosError<response<T>>
) => {
  if (e.response?.data?.errors) {
    showErrorMessage(e.response.data.errors.message)
  } else {
    showErrorMessage(e.message)
  }
  return e
}
