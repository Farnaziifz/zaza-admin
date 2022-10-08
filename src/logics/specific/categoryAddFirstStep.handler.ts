import { group } from '@/core/types/group.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { groupApi } from '@/resources/api/group'
import { goToPath } from '@/logics/shared/route.handler'
import { useGroupStore } from '@/resources/store/group.store'

const api = groupApi()
export const saveGroupQueries = async (groupData: group) => {
  showLoadingMessage()
  const res = await api.postPreview(groupData)

  if (res.data?.status === 200) {
    showSuccessMessage()
    goToPath('/category/add/second-step')
    const store = useGroupStore()
    store.changeGroupSettings(groupData)
  } else {
    showErrorMessage(res.error?.response?.statusText)
  }

}


export const postGroupPreview = async (groupData: group) => {
  showLoadingMessage()
  const res = await api.postPreview(groupData)

  if (res.data?.status === 200) {
    showSuccessMessage()
    goToPath('/category/add/second-step')
  } else {
    showErrorMessage(res.error?.response?.statusText)
  }
  console.log(res)
}
