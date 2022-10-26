import { discountApi } from '@/resources/api/discount'
import { groupApi } from '@/resources/api/group'
import { customerApi } from '@/resources/api/customer'

import {
  discountsList,
  discountCustomerGroup,
  discountGroup,
  discountFirstStep,
  discountSecondStep,
  discountThirdStep,
  discounts,
} from '@/core/types/discounts.type'
import {
  showErrorMessage,
  showLoadingMessage,
  showSuccessMessage,
} from '@/logics/shared/message.handler'
import { useDiscountStore } from '@/resources/store/discount.store'
import { goToPath } from '@/logics/shared/route.handler'

const api = discountApi()
const customersApi = customerApi()
const apiGroup = groupApi()

export const initPageHandler = async (
  page?: number,
  pageSize?: number
): Promise<discountsList> => {
  const res = await api.get(page, pageSize)
  const discount = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return discount
  else {
    showErrorMessage()
    throw 'error'
  }
}

export const chnageDiscountStatus = async (data: string) => {
  const res = await api.put(data)
  showLoadingMessage()
  if (res.status === 204) showSuccessMessage()
  else showErrorMessage()
}

export const deleteDiscount = async (data: string) => {
  await api.delete(data)
}

export const getDiscountDetails = async (data: string) => {
  const res = await api.getDetails(data)
  const discount = res.data

  const errors = res.errors

  if (Object.is(errors, null)) return discount
  else {
    // TODO: error handling
    throw 'errors'
  }
}

export const getDiscoutGroup = async (
  data: [],
  page?: number,
  pageSize?: number
): Promise<discountCustomerGroup> => {
  const res = await api.getGroup(data, page, pageSize)
  const discountGroupList = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return discountGroupList
  else {
    showErrorMessage()
    throw 'errors'
  }
}

export const getDiscoutGroupDetails = async (
  data: { groupId: string }[],
  page: 1,
  pageSize: 10
): Promise<discountGroup> => {
  const res = await api.getGroupDetails(data, page, pageSize)
  const discountGroupList = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return discountGroupList
  else {
    showErrorMessage()
    throw 'errors'
  }
}

export const checkCodeValidation = async (code: string) => {
  const res = await api.checkCodeValidation(code)
  console.log(res)
  const checkCode = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return checkCode
  else {
    showErrorMessage()
    throw 'errors'
  }
}

export const generateCode = async () => {
  const res = await api.generateCode()
  const generateCode = res.data
  const errors = res.errors
  if (Object.is(errors, null)) return generateCode
  else {
    showErrorMessage()
    throw 'errors'
  }
}

export const newDiscountAdd = async (data: discounts) => {
  const res = await api.post(data)
  showLoadingMessage()
  if (res.data?.status === 204) {
    showSuccessMessage()
    goToPath('/discount/list')
    const discountStore = useDiscountStore()
    discountStore.emptyDiscountStore()
  } else showErrorMessage(res.error?.response?.statusText)
}

export const saveDiscountDataFirstStep = (discountData: discountFirstStep) => {
  const discountStore = useDiscountStore()
  discountStore.changeDiscountSetting(discountData)
  goToPath('/discount/add/second-step')
}

export const saveDiscountDataSecondStep = (
  discountData: discountSecondStep
) => {
  const discountStore = useDiscountStore()
  discountStore.changeDiscoundSecondStep(discountData)
  goToPath('/discount/add/third-step')
}

export const saveDiscountThirdStep = (discountData: discountThirdStep) => {
  const discountStore = useDiscountStore()
  discountStore.changeDiscountThirdStep(discountData)
}

export const getGroupTitle = async () => await apiGroup.getTitle()

export const getCustomersInGroup = async (groupId: string, page = 1) =>
  await customersApi.getCustomersInGroup(groupId, page)
