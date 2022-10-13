import { useCreditStore } from '@/resources/store/credit.store'
import { credit } from '@/core/types/credits.type'
import { convertDateFromPersianToGeorgian } from '@/logics/shared/date.handler'

export const saveCreditToStore = (creditData: credit) => {
  const creditStore = useCreditStore()

  if (creditData.startAt)
    creditData.startAt = convertDateFromPersianToGeorgian(
      creditData.startAt.toString()
    )

  if (creditData.expireAt)
    creditData.expireAt = convertDateFromPersianToGeorgian(
      creditData.expireAt.toString()
    )

  creditStore.saveCreditDataInStore(creditData)
} 