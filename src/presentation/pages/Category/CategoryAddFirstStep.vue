<script setup lang="ts">
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import InputWithHeadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import { t } from 'vui18n'
import PlusIcon from '/src/presentation/components/shared/atoms/PlusIcon.vue'
import { computed, Ref, ref } from 'vue'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import BDatePicker from '/src/presentation/components/shared/Organisms/BDatePicker.vue'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'
import FilterBusinessClassification from '/src/presentation/components/specific/CategoryAddFirstStep/FilterBusinessClassification.vue'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { query } from '@/core/types/query.type'
import FilterOrderRange from '/src/presentation/components/specific/CategoryAddFirstStep/FilterOrderRange.vue'
import FilterPurchasedProductRange from '/src/presentation/components/specific/CategoryAddFirstStep/FilterPurchasedProductRange.vue'
import FilterPaidMoneyRange from '/src/presentation/components/specific/CategoryAddFirstStep/FilterPaidMoneyRange.vue'
import FilterPaymnetAverage from '/src/presentation/components/specific/CategoryAddFirstStep/FilterPaymnetAverage.vue'
import FilterHasFeedback from '/src/presentation/components/specific/CategoryAddFirstStep/FilterHasFeedback.vue'
import FilterProductsInBasketAverage from '/src/presentation/components/specific/CategoryAddFirstStep/FilterProductsInBasketAverage.vue'
import { saveGroupQueries } from '@/logics/specific/categoryAddFirstStep.handler'
import FilterNumberOfFailedPayment from '/src/presentation/components/specific/CategoryAddFirstStep/FilterNumberOfFailedPayment.vue'
import FilterBadgeLabel from '/src/presentation/components/specific/CategoryAddFirstStep/FilterBadgeLabel.vue'
import FilterSatisfaction from '/src/presentation/components/specific/CategoryAddFirstStep/FilterSatisfaction.vue'
import { DeleteOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'
import { useGroupStore } from '@/resources/store/group.store'
import { convertDateFromPersianToGeorgian } from '@/logics/shared/date.handler'

const titleValue = ref('')
const btnDisabled = computed(() => !titleValue.value)
const showModal = ref(false)
const selectValue: Ref<string | undefined> = ref('')
const pickedDate = ref()
const groupStore = useGroupStore()

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  queryValue.value = undefined
  selectValue.value = undefined
}

const addQueryToList = () => {
  if (
    (selectValue.value === groupQueryTypeEnum.PAID_MONEY_RANGE ||
      selectValue.value === groupQueryTypeEnum.PAYMENT_AVERAGE) &&
    (queryValue.value?.from < 5000 || queryValue.value?.to < 5000)
  ) {
    closeModal()
    showErrorMessage('مقادیر وارده برای بازه اشتباه میباشد')
    return
  }

  if (
    queryValue.value?.to &&
    queryValue.value?.from &&
    queryValue.value.from > queryValue.value.to
  ) {
    closeModal()
    showErrorMessage('مقادیر وارده برای بازه اشتباه میباشد')
    return
  }

  if (
    (queryValue.value?.from || queryValue.value?.to) &&
    queryValue.value?.value
  ) {
    closeModal()
    showErrorMessage('لطفا مقدار مورد نظر خود را وارد کنید')
    return
  }

  if (queryValue.value) {
    queryList.value.push(queryValue.value)
    closeModal()
  } else {
    showErrorMessage('لطفا فیلتر خود را انتخاب کنید')
    closeModal()
  }
}

const groupQueryOptions: { value: string; label?: string }[] = []
for (const key in groupQueryTypeEnum) {
  groupQueryOptions.push({ value: key, label: t(`types.groupQuery.${key}`) })
}

const queryValue = ref()
const queryList: Ref<query[]> = ref([])

const nextStep = async () => {
  await saveGroupQueries({
    from: convertDateFromPersianToGeorgian(pickedDate.value[0]),
    to: convertDateFromPersianToGeorgian(pickedDate.value[1]),
    title: titleValue.value,
    queries: queryList.value,
  })
}

const deleteQuery = (key: number) => {
  queryList.value.splice(key, 1)
}

if (groupStore.title) {
  titleValue.value = groupStore.title
  queryList.value = groupStore.queries
}
if (groupStore.to && groupStore.from) {
  pickedDate.value = [groupStore.from, groupStore.to]
}
</script>

<template>
  <hint-collapse :hints="[{ body: '' }]" />
  <a-card style="margin: 8px 0; background-color: #f6f6f6">
    <div class="flex flex-row flex-wrap items-center">
      <input-with-headline
        v-model:value="titleValue"
        type="text"
        :placeholder="
          _.toString(
            t('pages.CategoryAddFirstStep.CategoryNameInputPlaceholder')
          )
        "
      >
        <template #headlineText>
          <span style="font-weight: 500; font-size: 16px">
            {{ t('pages.CategoryAddFirstStep.CategoryNameInputHeadline') }}
          </span>
        </template>
      </input-with-headline>

      <b-date-picker
        v-model:value="pickedDate"
        class="mx-4"
        :place-holder="
          _.toString(
            t('pages.CategoryAddFirstStep.CategoryAddDatePickerPlaceHolder')
          )
        "
        :range="true"
        type="date"
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

    <div class="flex flex-row items-center flex-wrap my-6">
      <a-card
        v-for="(q, key) in queryList"
        :key="key"
        size="small"
        style="width: 512px; min-width: 256px; max-height: 128px"
        class="mx-2"
      >
        <div class="flex justify-between items-center">
          <span>
            {{ t(`types.groupQuery.${q.type}`) }}
          </span>
          <a-button type="link" @click="deleteQuery(key)">
            <template #icon>
              <delete-outlined />
            </template>
          </a-button>
        </div>

        <div class="flex flex-row items-center">
          <div v-if="q.from" class="mt-1">
            <span> از </span>
            <span style="color: #1894ff">
              {{
                q.type === groupQueryTypeEnum.PAID_MONEY_RANGE ||
                q.type === groupQueryTypeEnum.PAYMENT_AVERAGE
                  ? _.toNumber(q.from) / 10
                  : q.from
              }}
              <template v-if="q.type === groupQueryTypeEnum.ORDER_RANGE">
                سفارش
              </template>
              <template
                v-if="
                  q.type === groupQueryTypeEnum.PAID_MONEY_RANGE ||
                  q.type === groupQueryTypeEnum.PAYMENT_AVERAGE
                "
              >
                تومان
              </template>

              <template
                v-if="q.type === groupQueryTypeEnum.NUMBER_OF_FAILED_PAYMENT"
              >
                پرداخت
              </template>

              <template
                v-if="
                  q.type === groupQueryTypeEnum.PRODUCTS_IN_BASKET_AVERAGE ||
                  q.type === groupQueryTypeEnum.PURCHASED_PRODUCT_RANGE
                "
              >
                زیرمحصول
              </template>
            </span>
          </div>

          <div v-if="q.to" class="mt-1">
            <span> تا </span>
            <span style="color: #1894ff">
              {{
                q.type === groupQueryTypeEnum.PAID_MONEY_RANGE ||
                q.type === groupQueryTypeEnum.PAYMENT_AVERAGE
                  ? _.toNumber(q.to) / 10
                  : q.to
              }}

              <template v-if="q.type === groupQueryTypeEnum.ORDER_RANGE">
                سفارش
              </template>
              <template
                v-if="
                  q.type === groupQueryTypeEnum.PAID_MONEY_RANGE ||
                  q.type === groupQueryTypeEnum.PAYMENT_AVERAGE
                "
              >
                تومان
              </template>

              <template
                v-if="q.type === groupQueryTypeEnum.NUMBER_OF_FAILED_PAYMENT"
              >
                پرداخت
              </template>

              <template
                v-if="
                  q.type === groupQueryTypeEnum.PRODUCTS_IN_BASKET_AVERAGE ||
                  q.type === groupQueryTypeEnum.PURCHASED_PRODUCT_RANGE
                "
              >
                زیرمحصول
              </template>
            </span>
          </div>

          <div v-if="q.value" class="mt-1">
            <span
              v-if="q.type === groupQueryTypeEnum.BUSINESS_CLASSIFICATION"
              style="color: #1894ff"
            >
              {{ t(`types.businessClassification.${q.value}`) }}
            </span>
          </div>

          <div v-if="q.value" class="mt-1">
            <span
              v-if="q.type === groupQueryTypeEnum.SATISFACTION_LABEL"
              style="color: #1894ff"
            >
              {{ t(`types.satisfaction.${q.value}`) }}
            </span>
          </div>

          <div v-if="q.value" class="mt-1">
            <span
              v-if="q.type === groupQueryTypeEnum.BADGE_LABEL"
              style="color: #1894ff"
            >
              {{ t(`types.badge.${q.value.toLowerCase()}`) }}
            </span>
          </div>

          <div v-if="q.value" class="mt-1">
            <span
              v-if="q.type === groupQueryTypeEnum.HAS_FEEDBACK"
              style="color: #1894ff"
            >
              {{ q.value ? 'دارد' : 'ندارد' }}
            </span>
          </div>
        </div>
      </a-card>
    </div>
  </a-card>

  <hr class="my-8" />

  <div class="text-left">
    <a-button
      type="primary"
      class="button-secondary"
      :disabled="btnDisabled"
      @click="nextStep"
    >
      مرحله بعد
    </a-button>
  </div>

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

    <FilterProductsInBasketAverage
      v-if="selectValue === groupQueryTypeEnum.PRODUCTS_IN_BASKET_AVERAGE"
      v-model:value="queryValue"
    />

    <FilterPaymnetAverage
      v-if="selectValue === groupQueryTypeEnum.PAYMENT_AVERAGE"
      v-model:value="queryValue"
    />

    <FilterHasFeedback
      v-if="selectValue === groupQueryTypeEnum.HAS_FEEDBACK"
      v-model:value="queryValue"
    />

    <FilterNumberOfFailedPayment
      v-if="selectValue === groupQueryTypeEnum.NUMBER_OF_FAILED_PAYMENT"
      v-model:value="queryValue"
    />

    <FilterBadgeLabel
      v-if="selectValue === groupQueryTypeEnum.BADGE_LABEL"
      v-model:value="queryValue"
    />

    <FilterSatisfaction
      v-if="selectValue === groupQueryTypeEnum.SATISFACTION_LABEL"
      v-model:value="queryValue"
    />
  </a-modal>
</template>
