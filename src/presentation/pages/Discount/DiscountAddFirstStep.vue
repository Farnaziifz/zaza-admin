<script lang="ts" setup>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import GenerateIcon from '/src/presentation/components/shared/atoms/Genrate.vue'
import BDatePicker from '/src/presentation/components/shared/Organisms/BDatePicker.vue'

import { t } from 'vui18n'
import { ref, computed } from 'vue'
import { showErrorMessage } from '@/logics/shared/message.handler'
import {
  checkCodeValidation,
  generateCode,
  saveDiscountDataFirstStep,
} from '../../../logics/specific/discount.handler'

import { useDiscountStore } from '../../../resources/store/discount.store'

const pickedStartDate = ref('')
const pickedEndDate = ref('')
const discountCode = ref('')
const discountName = ref('')

const discountStore = useDiscountStore()

const btnDisabled = computed(() => {
  if (discountName.value && discountCode.value) {
    return false
  }
  return true
})

const checkCode = async () => {
  const res = await checkCodeValidation(discountCode.value)
  if (res.isValid) {
    nextStep()
  } else {
    showErrorMessage(res.message)
  }
}

const nextStep = () => {
  saveDiscountDataFirstStep({
    title: discountName.value,
    code: discountCode.value,
    startAt: pickedStartDate.value,
    expireAt: pickedEndDate.value,
  })
}

const generateRandomCode = async () => {
  const res = await generateCode()
  discountCode.value = res.code
}

if (discountStore.title) {
  discountName.value = discountStore.title
  discountStore.code ? (discountCode.value = discountStore.code) : ''
  discountStore.startAt ? (pickedStartDate.value = discountStore.startAt) : ''
  discountStore.expireAt ? (pickedEndDate.value = discountStore.expireAt) : ''
}
</script>

<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: t('pages.DiscountAdd.hints.hintBody'),
            description: t('pages.DiscountAdd.hints.hintDescription'),
          },
          {
            body: t('pages.DiscountAdd.hints.hintBody'),
            description: t('pages.DiscountAdd.hints.hintDescription'),
          },
        ]"
      />
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
          فیلدها
        </h3>
        <div class="flex items-center">
          <div class="flex flex-col">
            <div>عنوان تخفیف</div>
            <a-input
              placeholder="عنوان تخفیف را وارد کنید"
              type="text"
              style="width: 250px"
              v-model:value="discountName"
            >
            </a-input>
          </div>
          <div class="flex flex-col mx-4">
            کد تخفیف
            <a-input
              placeholder="کد تخفیف را وارد کنید"
              type="text"
              style="width: 250px"
              v-model:value="discountCode"
            >
              <template #addonAfter>
                <a-button
                  type="link"
                  class="flex justify-center icon-btn"
                  @click="generateRandomCode"
                >
                  <template #icon>
                    <GenerateIcon />
                  </template>
                </a-button>
              </template>
            </a-input>
          </div>
          <div class="mx-4">
            <b-date-picker
              v-model:value="pickedStartDate"
              place-holder="تاریخ و زمان شروع را انتخاب کنید"
              :range="false"
              :dateType="true"
              ref="start"
              customId="startDate"
            >
              <template #headline>
                <span style="font-weight: 500; font-size: 16px">
                  تاریخ و زمان شروع
                </span>
              </template>
            </b-date-picker>
          </div>
          <div class="mx-4">
            <b-date-picker
              v-model:value="pickedEndDate"
              place-holder="تاریخ و زمان پایان را انتخاب کنید"
              :range="false"
              :dateType="true"
              ref="end"
              customId="endDate"
              :minDate="pickedStartDate"
              :disabled="!pickedStartDate.length"
            >
              <template #headline>
                <span style="font-weight: 500; font-size: 16px">
                  تاریخ و زمان پایان
                </span>
              </template>
            </b-date-picker>
          </div>
        </div>
      </a-card>
      <div class="line"></div>
      <div class="btn-container flex justify-end">
        <a-button
          type="primary"
          @click="checkCode"
          :disabled="btnDisabled"
          class="button-secondary"
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
.icon-btn {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
