import { durationTypeEnum } from '@/core/enums/cashback.enum'
import { cashback } from '@/core/types/cashback.type'
import { Ref, computed } from 'vue'
import _ from 'lodash'

export const cashbackComputedPropertiesFactory = (
  serverData: Ref<cashback>
) => {
  const isBtnDisabled = computed((): boolean => {
    if (!serverData.value.isActive) return true

    if (!serverData.value.type) return true

    if (!_.toNumber(serverData.value.minimumAmount)) return true

    if (
      serverData.value.type === 'PRICE' &&
      !_.toNumber(serverData.value.amount)
    )
      return true

    if (
      serverData.value.type === 'PERCENTAGE' &&
      (!_.toNumber(serverData.value.amount) ||
        !_.toNumber(serverData.value.maximumPrice))
    )
      return true

    if (
      !serverData.value.durationType &&
      serverData.value.durationType !== durationTypeEnum.NONE &&
      _.toNumber(serverData.value.duration)
    )
      return true

    return false
  })

  return {
    isBtnDisabled,
  }
}