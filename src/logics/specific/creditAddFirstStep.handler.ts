import { useCreditStore } from '@/resources/store/credit.store'
import { credit } from '@/core/types/credits.type'
import { convertDateFromPersianToGeorgian } from '@/logics/shared/date.handler'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { goToPath } from '@/logics/shared/route.handler'
import { creditsApi } from '@/resources/api/credits'
import { groupItemTitle } from '@/core/types/group.type'
import _ from 'lodash'

const api = creditsApi()

export const sendDataToServerHandler = async (
  selectedGroups: groupItemTitle[]
) => {
  const store = useCreditStore()
  const groups = selectedGroups.filter((el) => el.groupId)
  if (store.amount) {
    await api.post({
      amount: _.toNumber(store.amount),
      startAt: store.startAt ? store.startAt : undefined,
      expireAt: store.expireAt ? store.expireAt : undefined,
      creditGroups: groups ? groups : undefined,
    })
  } else {
    showErrorMessage('دیتای کافی برای ارسال به سرور موجود نیست.')
  }
}

export const saveCreditToStore = (creditData: credit) => {
  const creditStore = useCreditStore()

  if (creditData.startAt && !creditStore.startAt) {
    creditData.startAt = convertDateFromPersianToGeorgian(
      creditData.startAt.toString()
    )
  }

  if (creditData.expireAt && !creditStore.expireAt) {
    creditData.expireAt = convertDateFromPersianToGeorgian(
      creditData.expireAt.toString()
    )
  }

  // if (creditData.startAt === creditData.expireAt) {
  //   showErrorMessage('تاریخ شروع نمیتواند مساوی تاریخ پایان باشد')
  //   throw 'error'
  // }

  if (creditData.startAt && creditData.expireAt) {
    if (creditData.startAt >= creditData.expireAt) {
      showErrorMessage('تاریخ شروع نباید از پایان بیشتر یا مساوی باشد')
      creditData.startAt = undefined
      creditData.expireAt = undefined
      throw 'error'
    }
  }

  creditStore.saveCreditDataInStore(creditData)
  goToPath('/credits/add/second-step')
}
