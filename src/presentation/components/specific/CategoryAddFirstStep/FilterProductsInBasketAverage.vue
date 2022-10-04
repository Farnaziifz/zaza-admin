<script lang="ts" setup>
import { ref } from 'vue'
import { t } from 'vui18n'
import _ from 'lodash'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'

const emits = defineEmits(['update:value'])
const ProductsInBasketAverage = ref({
  from: null,
  to: null,
})

const passOrderRangeToParents = () =>
  emits('update:value', {
    value: null,
    type: groupQueryTypeEnum.PRODUCTS_IN_BASKET_AVERAGE,
    to: ProductsInBasketAverage.value.to
      ? _.toNumber(ProductsInBasketAverage.value.to)
      : null,
    from: ProductsInBasketAverage.value.from
      ? _.toNumber(ProductsInBasketAverage.value.from)
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
        v-for="(order, key) in ProductsInBasketAverage"
        :key="key"
        v-model:value="ProductsInBasketAverage[key]"
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
