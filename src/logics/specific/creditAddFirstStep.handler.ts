import { useCreditStore } from '@/resources/store/credit.store'
import { credit } from '@/core/types/credits.type'
import { convertDateFromPersianToGeorgian } from '@/logics/shared/date.handler'
import { showErrorMessage } from '@/logics/shared/message.handler'

export const saveCreditToStore = (creditData: credit) => {
  const creditStore = useCreditStore()

  if (creditData.startAt) {
    creditData.startAt = convertDateFromPersianToGeorgian(
      creditData.startAt.toString()
    )
  }

  if (creditData.expireAt) {
    creditData.expireAt = convertDateFromPersianToGeorgian(
      creditData.expireAt.toString()
    )
  }

  if (creditData.startAt && creditData.expireAt) {
    if (creditData.startAt > creditData.expireAt) {
      showErrorMessage('تاریخ شروع نباید از پایان بیشتر باشد')
      throw 'error'
    }
  }

  creditStore.saveCreditDataInStore(creditData)
}
