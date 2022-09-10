<script setup lang="ts">
import {ComputedRef, ref} from 'vue'
import BSelectRtl from '../components/shared/atoms/BSelectRtl.vue'
import {degreeOptions} from '../../core/constants/degree.options'
import {degreeTypeEnum} from '../../core/enums/degreeType.enum'
import HintCollapse from '../components/shared/organisms/HintCollapse.vue'
import InputWithHeadlineAndUnit from '../components/shared/molecules/InputWithHeadlineAndUnit.vue'
import {computedPropertiesFactory} from '../../logics/specific/labelSettingsDegreeComputedProperties.factory'
import ContentLayout from '../layouts/ContentLayout.vue'

const value = ref('')
const switchCheck = ref(false)
const orderCount = ref('')
const degreeCount = ref('')
const priceAmount = ref('')

const computedProperties = computedPropertiesFactory({
  value,
  switchCheck,
  orderCount,
  degreeCount,
  priceAmount,
})

const isSubmitButtonDisabled: ComputedRef<boolean> =
    computedProperties.isSubmitButtonDisabledComputedFactory()
</script>

<template>
  <content-layout>
    <template #content-title> درجه</template>

    <template #content-body>
      <hint-collapse :hints="[{ body: 'درجه' }]" header="راهنما"/>

      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <div class="flex justify-between">
          <h2>فعال سازی اطلاع رسانی برچسب</h2>
          <a-switch v-model:checked="switchCheck"/>
        </div>
      </a-card>

      <a-card style="margin: 8px 0; background-color: #f6f6f6" disabled="true">
        <h2>اطلاعات درجه</h2>

        <div class="mt-4">
          <h3>نوع محاسبه درجه</h3>
          <b-select-rtl
              v-model:value="value"
              style="width: 254px"
              :disabled="!switchCheck"
              :options="degreeOptions"
              suffix-icon-color="#1894FF"
              place-holder="نوع محاسبه را انتخاب کنید"
          />
        </div>

        <div
            v-if="value === degreeTypeEnum.PER_ORDER"
            class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
              v-model:value="orderCount"
              class="ml-4 sm:mb-4"
              headline="تعداد سفارش"
              unit="تعداد"
              placeholder=" تعداد سفارش را وارد کنید"
              style="width: 254px"
          />

          <input-with-headline-and-unit
              v-model:value="degreeCount"
              unit="درجه"
              headline="مقدار درجه"
              style="width: 254px"
              placeholder="مقدار درجه را وارد کنید"
          />
        </div>

        <div
            v-else-if="value === degreeTypeEnum.PER_PRICE"
            class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
              v-model:value="priceAmount"
              class="ml-4 sm:mb-4"
              unit="تومان"
              placeholder="مبلغ را وارد کنید"
              style="width: 254px"
              headline="مبلغ مورد نظر"
          />

          <input-with-headline-and-unit
              v-model:value="degreeCount"
              unit="درجه"
              headline="مقدار درجه"
              placeholder="مقدار درجه را وارد کنید"
              style="width: 254px"
          />
        </div>
      </a-card>

      <div class="text-left">
        <a-button
            type="primary"
            style="padding: 0 56px"
            :disabled="isSubmitButtonDisabled"
        >
          ثبت تغییرات
        </a-button>
      </div>
    </template>
  </content-layout>
</template>