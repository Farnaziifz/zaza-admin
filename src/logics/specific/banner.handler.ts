import { bannerApi } from '@/resources/api/banner'
import { bannerList } from '@/core/types/category.type'

const api = bannerApi()

export const initPageHandler = async (): Promise<bannerList> => {
  const res = await api.bannerListGet()

  return res
}

export const addbanner = async (model: FormData) => {
  const res = await api.addbanner(model)
  return res
}

export const getbanner = async (id: string | number) => {
  const res = await api.getbanner(id)
  return res
}

export const updatebanner = async (id: string, model: FormData) => {
  const res = await api.updatebanner(id, model)
  return res
}
