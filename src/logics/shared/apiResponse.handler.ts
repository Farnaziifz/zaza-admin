import { AxiosError, AxiosResponse } from 'axios'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { api } from '@/resources/api'

type response<T = never> = {
  data?: T
  errors?: {
    message: string
  }
}

export const makeARequest = async <T>(
  apiHandler:
    | (<T>(route: string, data?: T) => Promise<AxiosResponse<response<T>>>)
    | (<T>(route: string) => Promise<AxiosResponse<response<T>>>),
  route: string,
  data?: T
): Promise<response<T>> => {
  if (apiHandler === api.get) showLoadingMessage('درحال دریافت دیتا')
  else showLoadingMessage()
  try {
    const res = await apiHandler(route, data)
    handleSuccessMessageBroadcasting(res.status)
    return res.data as response<T>
  } catch (e) {
    const err = e as AxiosError<response<T>>
    return handleError<T>(err)
  }
}

export const handleError = <T>(e: AxiosError<response<T>>): response<T> => {
  handleErrorMessageBroadcasting<T>(e)
  throw e
}

export const handleSuccessMessageBroadcasting = (
  status: number,
  message?: string
) => {
  if (status === 200 || status === 204) {
    if (message) showSuccessMessage(message)
    else showSuccessMessage()
  }
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
