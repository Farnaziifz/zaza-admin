import { groupApi } from '../../resources/api/group'
import { groupList } from '@/core/types/group.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'

const api = groupApi()

export const getGroupList = async (page?: number, pageSize?: number) => {
  const res = await api.groupListGet(page, pageSize)
  return res.data
}

export const deleteGroup = async (id: string) => {
  const res = await api.groupDelete(id)
  return res.data
}

export const groupStatus = async (id: string) => {
  const res = await api.groupStatus(id)
  return res.data
}

export const getGroupDetails = async (id: string) => {
  const res = await api.groupDetailsGet(id)
  return res.data
}
