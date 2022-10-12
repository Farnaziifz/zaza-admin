import {AxiosError, AxiosResponse} from 'axios'
import {showErrorMessage} from '@/logics/shared/message.handler'

type response<T = never> = {
    data?: T
    errors?: {
        message: string
    }
}

const defaultError: response = {
    errors: {
        message: 'ناموفق'
    }
}

export const makeARequest = async <T>(
    apiHandler:
        | (<T>(route: string, data?: T) => Promise<AxiosResponse<response<T>>>)
        | (<T>(route: string) => Promise<AxiosResponse<response<T>>>),
    route: string,
    data?: T
): Promise<response<T>> => {
    try {
        if (data) return apiHandler(route, data).then(res => res.data)
        else return apiHandler(route).then(res => res.data) as response<T>
    } catch (e) {
        const err = e as AxiosError<response<T>>
        return handleError<T>(err)
    }
}

export const handleError = <T>(e: AxiosError<response<T>>): response<T> => {
    handleErrorMessageBroadcasting<T>(e)

    if (e.response)
        return e.response.data
    else
        return defaultError
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

