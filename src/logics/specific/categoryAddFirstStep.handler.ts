import { group } from '@/core/types/group.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { groupApi } from '@/resources/api/group'
import { goToPath } from '@/logics/shared/route.handler'
import { useGroupStore } from '@/resources/store/group.store'
import { customerApi } from '@/resources/api/customer'

const groupApiCaller = groupApi()

export const saveGroupQueries = async (
  groupData: group,
  paginate = { current: 1, pageSize: 10 }
) => {
  showLoadingMessage()
  const res = await groupApiCaller.postPreview(groupData, paginate)

  if (res.data?.status === 200) {
    showSuccessMessage()
    goToPath('/category/add/second-step')
    const store = useGroupStore()
    store.changeGroupSettings(groupData)
  } else {
    showErrorMessage(res.error?.response?.statusText)
  }
}

export const postGroupPreview = async (
  groupData: group,
  paginate = { current: 1, pageSize: 10 }
) => {
  showLoadingMessage()
  const res = await groupApiCaller.postPreview(groupData, paginate)

  if (res.data?.status === 204) {
    showSuccessMessage()
    return res.data.data.data
  } else {
    showErrorMessage(res.error?.response?.statusText)
  }
}

export const postGroup = async (groupData: group) => {
  showLoadingMessage()
  const res = await groupApiCaller.post(groupData)
  if (res.data?.status === 200) {
    showSuccessMessage()
    return res.data.data.data
  } else {
    showErrorMessage(res.error?.response?.statusText)
    return
  }
}
