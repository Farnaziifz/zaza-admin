import { api } from './index'
import { response } from '@/core/types/apiResponse.type'
import { badgeItem } from '@/core/types/badge.type'

const pageUrl = 'badge'

const badgeGet = async (): Promise<response<badgeItem[]>> => {
  const res = await api.get(pageUrl)
  return res.data
}

export const badgePut = async (badgeItems: badgeItem[]) => {
  try {
    return await api.put(pageUrl, { badges: badgeItems })
  } catch (e) {
    return { status: -1 }
  }
}

export const badgeApi = () => {
  return {
    get: badgeGet,
    put: badgePut,
  }
}
