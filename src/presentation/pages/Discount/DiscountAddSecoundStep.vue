<script lang="ts" setup>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import {
  DiscountConsumeType,
  DiscountStateType,
  DiscountTypeType,
} from '../../../core/enums/discount.enum'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import SevralTimeVariableCashField from '/src/presentation/components/specific/DiscountSecondStep/SevralTimeVariableCashFields.vue'
import { ref, computed } from 'vue'
import { returnToPreviousRoute } from '@/logics/shared/route.handler'

const settingData = ref({
  consumeType: '',
  stateType: '',
  type: '',
})

const showFeilds = ref({ show: false })
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
  console.log('add')
}

const goToPastStep = () => returnToPreviousRoute()
</script>
<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: 'انتخاب مشتریان هدف',
            description:
              'با انتخاب مشتریان هدف، شما می‌توانید مشخص کنیدکد تخفیف شامل کدام  یک از دسته بندی های مشتریان شما شود.',
          },
          {
            body: 'دسته‌بندی',
            description:
              'برای افزودن مشتریان هدف، ابتدا در بخش دسته بندی، دسته مورد نظر خود را بسازید. ',
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
            <a-radio-group v-model:value="settingData.consumeType" size="large">
              <a-radio-button :value="DiscountConsumeType.ONCE">
                <span class="px-12"> یکبار </span>
              </a-radio-button>
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
            <a-radio-group v-model:value="settingData.stateType" size="large">
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
            <a-radio-group v-model:value="settingData.type" size="large">
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
              :disabled="btnDisabled"
              @click="
                () => {
                  showFeilds.show = true
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
              />
              <input-with-headline-and-unit
                headline="مبلغ تخفیف"
                placeholder="مبلغ مورد نظر را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
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
              />
              <input-with-headline-and-unit
                headline="سقف تخفیف"
                placeholder="سقف تخفیف را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
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
              />
              <input-with-headline-and-unit
                headline="مبلغ تخفیف"
                placeholder="مبلغ مورد نظر را وارد کنید"
                unit="تومان"
                style="max-width: 256px"
                class="mr-4"
              />
              <input-with-headline-and-unit
                headline="محدودیت مصرف به ازای هر مشتری"
                placeholder="تعداد را وارد کنید"
                unit="نفر"
                style="max-width: 256px"
                class="mr-4"
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
              />
              <input-with-headline-and-unit
                headline="سقف قیمتی"
                placeholder="سقف قیمتی را وارد کنید"
                unit="درصد"
                style="max-width: 256px"
                class="mr-4"
              />
              <input-with-headline-and-unit
                headline="محدودیت مصرف به ازای هر مشتری"
                placeholder="تعداد را وارد کنید"
                unit="نفر"
                style="max-width: 256px"
                class="mr-4"
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
            <SevralTimeVariableCashField />
          </div>
        </div>
      </a-card>
      <div class="line"></div>
      <div class="btn-container flex justify-end">
        <a-button class="ml-4" @click="goToPastStep">
          <span>مرحله قبل</span>
        </a-button>
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
