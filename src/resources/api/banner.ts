import { type bannerList } from '@/core/types/category.type'
import { api } from '../api/index'

const pageUrl = 'category'

type bannerResponse = bannerList

const bannerListGet = async (): Promise<bannerResponse> => {
  const res = await api.get(`${pageUrl}/banner/?for_admin=true`)
  return res.data
}

const addbanner = async (model: FormData) => {
  const res = await api.post(`${pageUrl}/banner/?for_admin=true`, model)
  return res.data
}

const getbanner = async (id: string | number) => {
  const res = await api.get(`${pageUrl}/banner/${id}/?for_admin=true`)
  return res.data
}

const updatebanner = async (id: string, model: FormData) => {
  const res = await api.put(`${pageUrl}/banner/${id}?for_admin=true`, model)
  return res.data
}

export const bannerApi = () => {
  return {
    bannerListGet,
    addbanner,
    getbanner,
    updatebanner,
  }
}
