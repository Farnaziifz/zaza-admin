import { tagsApi } from '@/resources/api/blog'
import { tag, type tagList } from '@/core/types/tags.type'

const api = tagsApi()

export const initPageHandler = async (): Promise<tagList> => {
  const res = await api.tagListGet()

  return res
}

export const addTags = async (model: tag) => {
  const res = await api.addTags(model)
  return res
}

export const getTag = async (id: string | number) => {
  const res = await api.getTag(id)
  return res
}

export const updateTags = async (id: string | number, model: tag) => {
  const res = await api.updateTags(id, model)
  return res
}
