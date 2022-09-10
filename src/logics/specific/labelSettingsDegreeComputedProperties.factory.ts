import { computed, Ref } from 'vue'
import { degreeTypeEnum } from '../../core/enums/degreeType.enum'

export type labelSettingsDegreeVariablesTypes = {
    value: Ref<string>
    switchCheck: Ref<boolean>
    orderCount: Ref<string>
    degreeCount: Ref<string>
    priceAmount: Ref<string>
}

export const computedPropertiesFactory = (
    variables: labelSettingsDegreeVariablesTypes
) => {

    const isSubmitButtonDisabledComputedFactory = () =>
        computed(() => {
            if (!variables.switchCheck.value) return true

            if (variables.value.value === '') return true

            if (variables.degreeCount.value === '') return true

            if (
                variables.value.value === degreeTypeEnum.PER_ORDER &&
                variables.orderCount.value === ''
            )
                return true
            else if (
                variables.value.value === degreeTypeEnum.PER_PRICE &&
                variables.priceAmount.value === ''
            )
                return true

            return false
        })

    return {
        isSubmitButtonDisabledComputedFactory,
    }
}
