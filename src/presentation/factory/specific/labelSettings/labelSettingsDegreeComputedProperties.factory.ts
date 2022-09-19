import { computed, Ref } from 'vue'
import { scoreType } from '../../../../core/enums/scoreType.enum'
import { score } from '../../../../core/types/score.type'

export const computedPropertiesFactory = (
  value: Ref<string | null>,
  score: Ref<score>
) => {
  const isSubmitButtonDisabledComputedFactory = () =>
    computed(() => {
      if (!score.value.isActive) return true

      if (value.value === '') return true

      if (score.value.amount === 0) return true

      if (value.value === scoreType.ORDER && !score.value.value) return true
      else if (value.value === scoreType.PRICE && !score.value.value) return true

      return false
    })

  return {
    isSubmitButtonDisabledComputedFactory,
  }
}
