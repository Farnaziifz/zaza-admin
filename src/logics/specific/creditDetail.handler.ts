import { creditsApi } from '@/resources/api/credits'
import { groupApi } from '@/resources/api/group'
import {showErrorMessage} from "@/logics/shared/message.handler";

const api = creditsApi()
const gpApi = groupApi()

export const initHandler = async (id: string) => {
  const res = await api.getCreditDetails(id)
  let query = ''
  res.data?.groupIds?.map((el) => (query += `&GroupIds=${el}`))
  const groupDetails = await gpApi.getGroupTitle(`?${query}`)
  if (res.data && groupDetails.data) {
    return {
      creditDetails: res.data,
      groupDetails: groupDetails.data,
    }
  }else {
    showErrorMessage('خطایی رخ داده است')
  }
}
