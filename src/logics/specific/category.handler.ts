import { categoryApi } from '../../resources/api/category'
import { categoryList } from '../../core/types/category.type'
import { showErrorMessage } from '@/logics/shared/message.handler'

const api = categoryApi()

export const getCategoryList = async (
  page?: number,
  pageSize?: number,
  id?: string
): Promise<categoryList> => {
  const res = await api.get(page, pageSize, id)
  const category = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return category
  else {
    // TODO: error handling
    throw 'errors'
  }
}
