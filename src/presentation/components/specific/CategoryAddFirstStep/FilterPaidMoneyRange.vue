<script lang="ts" setup>
import { ref } from 'vue'
import { t } from 'vui18n'
import _ from 'lodash'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'

const emits = defineEmits(['update:value'])
const PaidMoneyRange = ref({
  from: null,
  to: null,
})

const passOrderRangeToParents = () =>
  emits('update:value', {
    value: null,
    type: groupQueryTypeEnum.PAID_MONEY_RANGE,
    to: PaidMoneyRange.value.to ? _.toNumber(PaidMoneyRange.value.to) : null,
    from: PaidMoneyRange.value.from
      ? _.toNumber(PaidMoneyRange.value.from)
      : null,
  })
</script>

<template>
  <div>
    <span style="font-weight: 500; font-size: 16px">
      {{ t('pages.CategoryAddFirstStep.modal.ORDER_RANGE.title') }}
    </span>
    <div class="flex items-center">
      <a-input
        v-for="(order, key) in PaidMoneyRange"
        :key="key"
        v-model:value="PaidMoneyRange[key]"
        type="number"
        :placeholder="
          t('pages.CategoryAddFirstStep.modal.ORDER_RANGE.inputPlaceholder')
        "
        @input="passOrderRangeToParents()"
      >
        <template #addonBefore>
          <span class="p-3">
            {{
              t(
                `pages.CategoryAddFirstStep.modal.ORDER_RANGE.input${_.capitalize(
                  key.toString()
                )}PrefixText`
              )
            }}
          </span>
        </template>
        <template #addonAfter>
          <span class="p-3">
            {{
              t('pages.CategoryAddFirstStep.modal.ORDER_RANGE.inputPostfixText')
            }}
          </span>
        </template>
      </a-input>
    </div>
  </div>
</template>
