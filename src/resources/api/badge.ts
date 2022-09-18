import { api } from './index'
import { response } from '../../core/types/apiResponse.type'
import { badgeItem } from '../../core/types/badge.type'

const pageUrl = 'badge'

const badgeGet = async (): Promise<response<badgeItem[]>> => {
  const res = await api.get(pageUrl)
  return res.data
}

export const badgePut = async (badgeItems: badgeItem[]) => {
  const res = await api.put(pageUrl, { badges: badgeItems })
}

export const badgeApi = () => {
  return {
    get: badgeGet,
    put: badgePut,
  }
}
