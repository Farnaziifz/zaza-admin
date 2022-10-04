<script setup lang="ts">
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import InputWithHeadline from '@/presentation/components/shared/molecules/InputWithHeadline.vue'
import { t } from 'vui18n'
import PlusIcon from '@/presentation/components/shared/atoms/PlusIcon.vue'
import { Ref, ref, watch } from 'vue'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'
import BDatePicker from '@/presentation/components/shared/Organisms/BDatePicker.vue'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'
import FilterBusinessClassification from '@/presentation/components/specific/CategoryAddFirstStep/FilterBusinessClassification.vue'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { query } from '@/core/types/query.type'
import FilterOrderRange from '@/presentation/components/specific/CategoryAddFirstStep/FilterOrderRange.vue'
import FilterPurchasedProductRange from '@/presentation/components/specific/CategoryAddFirstStep/FilterPurchasedProductRange.vue'
import FilterPaidMoneyRange from '@/presentation/components/specific/CategoryAddFirstStep/FilterPaidMoneyRange.vue'
import FilterPaymnetAverage from '@/presentation/components/specific/CategoryAddFirstStep/FilterPaymnetAverage.vue'
import FilterHasFeedback from '@/presentation/components/specific/CategoryAddFirstStep/FilterHasFeedback.vue'
import FilterProductsInBasketAverage from '@/presentation/components/specific/CategoryAddFirstStep/FilterProductsInBasketAverage.vue'

const showModal = ref(false)
const selectValue = ref('')
const pickedDate = ref([])
const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  queryValue.value = undefined
}

const addQueryToList = () => {
  if (queryValue.value?.from && queryValue.value?.to) {
    if (queryValue.value.from > queryValue.value.to) {
      showErrorMessage('مقادیر وارده برای بازه اشتباه میباشد')
      return
    }
  }

  if (queryValue.value) {
    queryList.value.push(queryValue.value)
  } else {
    showErrorMessage('لطفا فیلتر خود را انتخاب کنید')
  }
}

const groupQueryOptions: { value: string; label?: string }[] = []
for (const key in groupQueryTypeEnum) {
  groupQueryOptions.push({ value: key, label: t(`types.groupQuery.${key}`) })
}

const queryValue: Ref<query | undefined> = ref(undefined)
const queryList: Ref<query[]> = ref([])

watch(queryList, () => console.log(queryList.value), { deep: true })
</script>

<template>
  <hint-collapse :hints="[{ body: '' }]" />
  <a-card style="margin: 8px 0; background-color: #f6f6f6">
    <div class="flex flex-row flex-wrap items-center">
      <input-with-headline
        value=""
        type="text"
        :placeholder="
          t('pages.CategoryAddFirstStep.CategoryNameInputPlaceholder')
        "
        :headline="t('pages.CategoryAddFirstStep.CategoryNameInputHeadline')"
      />

      <b-date-picker
        v-model:value="pickedDate"
        class="mx-4"
        :place-holder="
          t('pages.CategoryAddFirstStep.CategoryAddDatePickerPlaceHolder')
        "
        :range="true"
      >
        <template #headline>
          <span style="font-weight: 500; font-size: 16px">
            {{ t('pages.CategoryAddFirstStep.CategoryAddDatePickerHeadline') }}
          </span>
        </template>
      </b-date-picker>
    </div>

    <div class="flex flex-row items-center justify-between mt-6">
      <h3>{{ t('pages.CategoryAddFirstStep.CategoryFilterTitle') }}</h3>

      <a-button class="button-secondary" @click="openModal">
        <div class="flex flex-row items-center">
          <plus-icon color="#fff" />
          <span>
            {{ t('pages.CategoryAddFirstStep.CategoryAddFilterButtonText') }}
          </span>
        </div>
      </a-button>
    </div>
  </a-card>

  <a-modal
    v-model:visible="showModal"
    :title="t('pages.CategoryAddFirstStep.modal.categoryFilterModalTitle')"
    @close="closeModal"
    @ok="addQueryToList"
  >
    <div class="flex flex-col">
      <span style="font-weight: 500; font-size: 16px">
        {{
          t(
            'pages.CategoryAddFirstStep.modal.categoryFilterModalSelectHeadline'
          )
        }}
      </span>
      <b-select
        v-model:value="selectValue"
        :place-holder="
          t(
            'pages.CategoryAddFirstStep.modal.categoryFilterModalSelectPlaceHolder'
          )
        "
        :options="groupQueryOptions"
      />
    </div>

    <hr v-if="selectValue" class="my-3" />

    <FilterBusinessClassification
      v-if="selectValue === groupQueryTypeEnum.BUSINESS_CLASSIFICATION"
      v-model:value="queryValue"
    />

    <FilterOrderRange
      v-if="selectValue === groupQueryTypeEnum.ORDER_RANGE"
      v-model:value="queryValue"
    />

    <FilterPurchasedProductRange
      v-if="selectValue === groupQueryTypeEnum.PURCHASED_PRODUCT_RANGE"
      v-model:value="queryValue"
    />

    <FilterPaidMoneyRange
      v-if="selectValue === groupQueryTypeEnum.PAID_MONEY_RANGE"
      v-model:value="queryValue"
    />

    <FilterPaymnetAverage
      v-if="selectValue === groupQueryTypeEnum.PAYMENT_AVERAGE"
      v-model:value="queryValue"
    />

    <FilterProductsInBasketAverage
      v-if="selectValue === groupQueryTypeEnum.PRODUCTS_IN_BASKET_AVERAGE"
      v-model:value="queryValue"
    />

    <FilterHasFeedback
      v-if="selectValue === groupQueryTypeEnum.HAS_FEEDBACK"
      v-model:value="queryValue"
    />
  </a-modal>
</template>

<style></style>
