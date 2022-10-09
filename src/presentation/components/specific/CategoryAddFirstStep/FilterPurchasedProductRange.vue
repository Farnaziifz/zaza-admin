<script lang="ts" setup>
import { ref } from 'vue'
import { t } from 'vui18n'
import _ from 'lodash'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'

const emits = defineEmits(['update:value'])
const PurchasedProductRange = ref({
  from: null,
  to: null,
})

const passOrderRangeToParents = () =>
  emits('update:value', {
    value: null,
    type: groupQueryTypeEnum.PURCHASED_PRODUCT_RANGE,
    to: PurchasedProductRange.value.to
      ? _.toNumber(PurchasedProductRange.value.to)
      : null,
    from: PurchasedProductRange.value.from
      ? _.toNumber(PurchasedProductRange.value.from)
      : null,
  })
</script>

<template>
  <div>
    <span style="font-weight: 500; font-size: 16px">
      بازه دلخواه تعداد زیرمحصولات خریداری شده
    </span>
    <div class="flex items-center">
      <a-input
        v-for="(order, key) in PurchasedProductRange"
        :key="key"
        v-model:value="PurchasedProductRange[key]"
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
          <span class="p-3"> تعداد </span>
        </template>
      </a-input>
    </div>
  </div>
</template>
