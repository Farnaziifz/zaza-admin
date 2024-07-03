import { type tagList, type tag } from '@/core/types/tags.type'
import { blog, type blogList } from '@/core/types/blog.type'

import { api } from '../api/index'

const pageUrl = 'blog'
type TagResponse = tagList
type BlogResponse = blogList

const tagListGet = async (): Promise<TagResponse> => {
  const res = await api.get(`${pageUrl}/tag/?for_admin=true`)
  return res.data
}

const addTags = async (model: tag) => {
  const res = await api.post(`${pageUrl}/tag/?for_admin=true`, model)
  return res.data
}

const getTag = async (id: string | number) => {
  const res = await api.get(`${pageUrl}/tag/${id}/?for_admin=true`)
  return res.data
}

const updateTags = async (id: string | number, model: tag) => {
  const res = await api.put(`${pageUrl}/tag/${id}/?for_admin=true`, model)
  return res.data
}

const blogListGet = async (): Promise<BlogResponse> => {
  const res = await api.get(`${pageUrl}/post/?for_admin=true`)
  return res.data
}

const blogAdd = async (model: FormData) => {
  const res = await api.post(`${pageUrl}/post/?for_admin=true`, model)
  return res.data
}
const getBlog = async (id: string | number) => {
  const res = await api.post(`${pageUrl}/post/${id}?for_admin=true`)
  return res.data
}

export const tagsApi = () => {
  return {
    tagListGet,
    addTags,
    getTag,
    updateTags,
    blogListGet,
    blogAdd,
    getBlog,
  }
}
