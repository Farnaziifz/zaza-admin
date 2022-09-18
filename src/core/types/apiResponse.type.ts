import { error } from './error.type'

export type response<T> = {
  data: T
  errors: error
}
