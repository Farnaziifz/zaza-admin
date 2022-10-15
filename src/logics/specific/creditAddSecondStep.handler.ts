import { groupApi } from '@/resources/api/group'

const api = groupApi()

export const initHandler = async () => await api.getTitle()
