import { group } from '@/core/types/group.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { groupApi } from '@/resources/api/group'

const api = groupApi()

export const postGroupPreview = async (groupData: group) => {
  showLoadingMessage()
  const res = await api.postPreview(groupData)

  if (res.data?.status === 200) {
    showSuccessMessage()
  } else {
    showErrorMessage(res.error?.response?.statusText)
  }
  console.log(res)
}