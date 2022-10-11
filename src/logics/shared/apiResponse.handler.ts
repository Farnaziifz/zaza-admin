import { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { showErrorMessage } from '@/logics/shared/message.handler'

type response<T> = {
  data?: T
  errors?: {
    message: string
  }
}

type res<T> = AxiosResponse<response<T>> | AxiosError<response<T>>

export const makeARequest = async <T>(
  apiHandler:
    | (<T>(route: string, data?: T) => Promise<AxiosResponse>)

    | (<T>(route: string) => Promise<AxiosResponse<T>>),
  route: string,
  data?: T
): Promise<res<T>> => {
  try {
    if (data) return await apiHandler(route, data)
    else return await apiHandler(route)
  } catch (e) {
    const err = e as AxiosError<response<T>>
    return handleErrorMessageBroadcasting<T>(err)
  }
}

export const handleErrorMessageBroadcasting = <T>(
  e: AxiosError<response<T>>
) => {
  if (e.response?.data.errors) {
    showErrorMessage(e.response.data.errors.message)
  } else {
    showErrorMessage(e.message)
  }
  return e
}