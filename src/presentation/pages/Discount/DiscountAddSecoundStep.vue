<script lang="ts" setup>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import {
  DiscountConsumeType,
  DiscountStateType,
  DiscountTypeType,
} from '../../../core/enums/discount.enum'
import { promotionStep } from '../../../core/types/discounts.type'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import SevralTimeVariableCashField from '/src/presentation/components/specific/DiscountSecondStep/SevralTimeVariableCashFields.vue'
import { ref, computed, Ref } from 'vue'
import { goToPath } from '@/logics/shared/route.handler'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { saveDiscountDataSecondStep } from '../../../logics/specific/discount.handler'
import { useDiscountStore } from '@/resources/store/discount.store'

const discountStore = useDiscountStore()
const settingData = ref({
  consumeType: '',
  stateType: '',
  type: '',
})

const showFeilds = ref({ show: false })
const isCreatedFileds = ref({ create: false })
const remainingPrice = ref()
const confirmPromotionStep: Ref<promotionStep[]> = ref([])
const amount = ref()
const minimumAmount = ref()
const maximumAmount = ref()
const consumeLimitation = ref()

// const minimumPayPriceInput = ref('')
const btnDisabled = computed(() => {
  if (
    settingData.value.consumeType &&
    settingData.value.stateType &&
    settingData.value.type
  ) {
    return false
  }
  return true
})

const onAddDiscountSecondStep = () => {
  console.log(remainingPrice.value)
  if (
    remainingPrice.value !== 0 &&
    settingData.value.consumeType === DiscountConsumeType.SEVERAL_TIMES &&
    settingData.value.stateType === DiscountStateType.VARIABLE &&
    settingData.value.type === DiscountTypeType.CASH
  ) {
    showErrorMessage('مجموع مبلع مرتبه کامل نشده است.')
  } else {
    saveDiscountDataSecondStep({
      type: settingData.value.type,
      consumeType: settingData.value.consumeType,
      stateType: settingData.value.stateType,
      amount: amount.value,
      minimumAmount: minimumAmount.value,
      maximumAmount: maximumAmount.value,
      consumeLimitation: consumeLimitation.value,
      promotionSteps: confirmPromotionStep.value,
    })
  }
}
const goToPastStep = () => goToPath('/discount/add/first-step')

const onRemainingPrice = (value: number) => {
  remainingPrice.value = value
}

const onChangeItem = () => {
  if (
    settingData.value.consumeType === DiscountConsumeType.SEVERAL_TIMES &&
    settingData.value.stateType === DiscountStateType.VARIABLE
  ) {
    settingData.value.type = DiscountTypeType.CASH
  }

  if (
    settingData.value.consumeType === DiscountConsumeType.ONCE &&
    settingData.value.type === DiscountTypeType.CASH
  ) {
    settingData.value.stateType = DiscountStateType.CONSTANT
  }
  showFeilds.value.show = false
  isCreatedFileds.value.create = false
  amount.value = undefined
  maximumAmount.value = undefined
  minimumAmount.value = undefined
  consumeLimitation.value = undefined
}

if (discountStore.type) {
  settingData.value.type = discountStore.type
  settingData.value.consumeType = discountStore.consumeType
    ? discountStore.consumeType
    : ''

  settingData.value.stateType = discountStore.stateType
    ? discountStore.stateType
    : ''
  amount.value = discountStore.amount
  minimumAmount.value = discountStore.minimumAmount
  maximumAmount.value = discountStore.maximumAmount
  consumeLimitation.value = discountStore.consumeLimitation
  showFeilds.value.show = true
}
const onUpdatePromotionStep = (steps: promotionStep[]) => {
  confirmPromotionStep.value = steps
}
const onChangeMinAmount = (value: string) => {
  minimumAmount.value = value
}
const onChangeAmount = (value: string) => {
  amount.value = value
}
</script>
<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: 'ساخت سبک تخفیف دهی',
            description:
              'پس از مشخص کردن دفعات مصرف، مراتب تخفیف و نوع تخفیف، شما کد تخفیف سفارشی ایجاد کرده‌اید این کد تخفیف قابل تخصیص به هر یک از دسته‌بندی‌های دلخواه است.',
          },
          {
            body: 'مراتب تخفیف',
            description:
              'شما با مشخص کردن مراتب تخفیف می‌توانید تخفیف خود را به صورت ثابت و یا به متغیر (به صورتی که در هر مرتبه چه مقداری مشخص از کد تخفیف مصرف شود) را مدیریت کنید. ',
          },
          {
            body: 'دفعات مصرف',
            description:
              'با مشخص کردن  دفعات مصرف کد تخفیف می‌توانید به مشتری اجازه دهید یکبار یا چندین بار از کد تخفیف استفاده کنند.',
          },
          {
            body: 'نوع تخفیف',
            description:
              'با مشخص کردن  نوع تخفیف می‌توانید تخفیف را به صورت تومانی و یا درصدی  به مشتری نشان دهید.',
          },
        ]"
      />
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
          تنظیمات تخفیف
        </h3>

        <div class="flex flex-wrap items-center mt-4">
          <div class="flex flex-col mb-4">
            <span style="font-weight: 500; font-size: 16px"> دفعات مصرف </span>
            <a-radio-group
              v-model:value="settingData.consumeType"
              size="large"
              @change="onChangeItem"
            >
              <a-radio-button :value="DiscountConsumeType.ONCE">
                <span class="px-12"> یکبار </span>
              </a-radio-button>
              {{ DiscountConsumeType.SEVERAL_TIMES }}
              <a-radio-button
                :value="DiscountConsumeType.SEVERAL_TIMES"
                class="px-12"
              >
                <span class="px-12"> چندبار </span>
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="flex flex-col mx-4 mb-4">
            <span style="font-weight: 500; font-size: 16px"> مراتب تخفیف </span>
            <a-radio-group
              v-model:value="settingData.stateType"
              size="large"
              @change="onChangeItem"
            >
              <a-radio-button :value="DiscountStateType.CONSTANT">
                <span class="px-12"> ثابت </span>
              </a-radio-button>
              <a-radio-button
                :value="DiscountStateType.VARIABLE"
                class="px-12"
                :disabled="settingData.consumeType === DiscountConsumeType.ONCE"
              >
                <span class="px-12"> پلکانی </span>
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="flex flex-col ml-4 mb-4">
            <span style="font-weight: 500; font-size: 16px"> نوع تخفیف </span>
            <a-radio-group
              v-model:value="settingData.type"
              size="large"
              @change="onChangeItem"
            >
              <a-radio-button :value="DiscountTypeType.CASH">
                <span class="px-12"> تومانی </span>
              </a-radio-button>
              <a-radio-button
                :value="DiscountTypeType.PERCENTAGE"
                class="px-12"
                :disabled="settingData.stateType === DiscountStateType.VARIABLE"
              >
                <span class="px-12"> درصدی </span>
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="flex flex-col">
            <a-button
              type="primary"
              class="button-secondary mt-2"
              style="height: 38px"
              :disabled="btnDisabled || isCreatedFileds.create"
              @click="
                () => {
                  showFeilds.show = true
                  isCreatedFileds.create = true
                }
              "
            >
              ساخت سبک تخفیف دهی
            </a-button>
          </div>
        </div>
      </a-card>
      <a-card
        v-if="showFeilds.show"
        style="margin: 8px 0; background-color: #f6f6f6"
      >
        <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
          فیلدها
        </h3>

        <div class="flex flex-wrap items-center mt-4">
          <div
            v-if="
              settingData.consumeType === DiscountConsumeType.ONCE &&
              settingData.stateType === DiscountStateType.CONSTANT &&
              settingData.type === DiscountTypeType.CASH
            "
          >
            <div class="flex flex-wrap items-center mt-4">
              <input-with-headline-and-unit
                headline="حداقل مبلغ پرداختی"
                placeholder="مبلغ مورد نظر را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                v-model:value="minimumAmount"
              />
              <input-with-headline-and-unit
                headline="مبلغ تخفیف"
                placeholder="مبلغ مورد نظر را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="amount"
              />
            </div>
          </div>
          <div
            v-if="
              settingData.consumeType === DiscountConsumeType.ONCE &&
              settingData.stateType === DiscountStateType.CONSTANT &&
              settingData.type === DiscountTypeType.PERCENTAGE
            "
          >
            <div class="flex flex-wrap items-center mt-4">
              <input-with-headline-and-unit
                headline="درصد تخفیف"
                placeholder="درصد تخفیف را وارد کنید"
                unit="درصد"
                style="max-width: 256px"
                v-model:value="amount"
              />
              <input-with-headline-and-unit
                headline="سقف تخفیف"
                placeholder="سقف تخفیف را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="maximumAmount"
              />
            </div>
          </div>
          <div
            v-if="
              settingData.consumeType === DiscountConsumeType.SEVERAL_TIMES &&
              settingData.stateType === DiscountStateType.CONSTANT &&
              settingData.type === DiscountTypeType.CASH
            "
          >
            <div class="flex flex-wrap items-center mt-4">
              <input-with-headline-and-unit
                headline="حداقل مبلغ پرداختی"
                placeholder="حداقل مبلغ پرداختی را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                v-model:value="minimumAmount"
              />
              <input-with-headline-and-unit
                headline="مبلغ تخفیف"
                placeholder="مبلغ مورد نظر را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="amount"
              />
              <input-with-headline-and-unit
                headline="محدودیت مصرف به ازای هر مشتری"
                placeholder="تعداد را وارد کنید"
                unit="نفر"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="consumeLimitation"
              />
            </div>
          </div>
          <div
            v-if="
              settingData.consumeType === DiscountConsumeType.SEVERAL_TIMES &&
              settingData.stateType === DiscountStateType.CONSTANT &&
              settingData.type === DiscountTypeType.PERCENTAGE
            "
          >
            <div class="flex flex-wrap items-center mt-4">
              <input-with-headline-and-unit
                headline="درصد تخفیف"
                placeholder="درصد تخفیف را وارد کنید"
                unit="درصد"
                style="max-width: 256px"
                v-model:value="amount"
              />
              <input-with-headline-and-unit
                headline="سقف قیمتی"
                placeholder="سقف قیمتی را وارد کنید"
                unit="درصد"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="maximumAmount"
              />
              <input-with-headline-and-unit
                headline="محدودیت مصرف به ازای هر مشتری"
                placeholder="تعداد را وارد کنید"
                unit="نفر"
                style="max-width: 256px"
                class="mr-4"
                v-model:value="consumeLimitation"
              />
            </div>
          </div>

          <div
            v-if="
              settingData.consumeType === DiscountConsumeType.SEVERAL_TIMES &&
              settingData.stateType === DiscountStateType.VARIABLE &&
              settingData.type === DiscountTypeType.CASH
            "
          >
            <SevralTimeVariableCashField
              @on-change-remainingPrice="onRemainingPrice"
              @on-update-promotionStep="onUpdatePromotionStep"
              :defaultSteps="
                discountStore.promotionSteps ? discountStore.promotionSteps : []
              "
              @on-change-min-amount="onChangeMinAmount"
              @onChangeAmount="onChangeAmount"
              :amount="amount"
              :minimumAmount="minimumAmount"
            />
          </div>
        </div>
      </a-card>
      <div class="line"></div>
      <div class="btn-container flex justify-end">
        <a-button class="ml-4" @click="goToPastStep">
          <span>مرحله قبل</span>
        </a-button>
        {{ remainingPrice }}
        <a-button
          type="primary"
          class="button-secondary"
          @click="onAddDiscountSecondStep"
        >
          <span>مرحله بعد</span>
        </a-button>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
  margin: 32px 0;
}
</style>
