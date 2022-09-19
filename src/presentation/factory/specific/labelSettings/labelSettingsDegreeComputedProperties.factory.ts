import { computed, Ref } from 'vue'
import { degreeType } from '../../../../core/enums/degreeType.enum'
import { degree } from '../../../../core/types/degree.type'

export const computedPropertiesFactory = (
  value: Ref<string | null>,
  degree: Ref<degree>
) => {
  const isSubmitButtonDisabledComputedFactory = () =>
    computed(() => {
      if (value.value === '') return true

      if (degree.value.amount === 0) return true

      if (value.value === degreeType.PER_ORDER && !degree.value.value)
        return true
      else if (value.value === degreeType.PER_PRICE && !degree.value.value)
        return true

      return false
    })

  return {
    isSubmitButtonDisabledComputedFactory,
  }
}
