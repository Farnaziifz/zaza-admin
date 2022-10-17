import { groupApi } from '@/resources/api/group'
import { customerApi } from '@/resources/api/customer'

const api = groupApi()
const customersApi = customerApi()

export const initHandler = async () => await api.getTitle()

export const getCustomersInGroup = async (groupId: string, page = 1) =>
  await customersApi.getCustomersInGroup(groupId, page)
