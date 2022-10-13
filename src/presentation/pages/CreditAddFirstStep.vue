<script setup lang="ts">
import InputWithHeadlineAndUnit from '@/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import BDatePicker from '@/presentation/components/shared/Organisms/BDatePicker.vue'
import { computed, ref, Ref } from 'vue'
import { credit } from '@/core/types/credits.type'
import _ from 'lodash'
import { saveCreditToStore } from '@/logics/specific/creditAddFirstStep.handler'

const serverData: Ref<credit> = ref({
  amount: 0,
  startAt: '',
  expireAt: '',
})
const creditHasExpirationDate = ref(false)

const isBtnDisabled = computed(() => {
  if (!_.toNumber(serverData.value.amount)) return true

  if (
    creditHasExpirationDate.value &&
    !serverData.value.startAt &&
    !serverData.value.expireAt
  )
    return true

  return false
})

const nextStep = () => saveCreditToStore(serverData.value)
</script>

<template>
  <a-card style="margin: 8px 0; background-color: #f6f6f6">
    <h2 style="font-weight: 700; font-size: 20px">اطلاعات اعتبار</h2>

    <div class="flex flex-row flex-wrap items-center mt-4">
      <input-with-headline-and-unit
        v-model:value="serverData.amount"
        unit="تومان"
        placeholder="مبلغ مورد نظر را وارد کنید"
      >
        <template #headline>
          <span style="font-weight: 500; font-size: 16px"> مبلغ اعتبار </span>
        </template>
      </input-with-headline-and-unit>

      <div class="flex flex-col mx-4">
        <span style="font-weight: 500; font-size: 16px"> مدت مصرف </span>
        <a-radio-group v-model:value="creditHasExpirationDate">
          <a-radio-button
            :value="true"
            class="px-8"
            style="width: 50%; text-align: center"
          >
            <span class="px-8"> دارد </span>
          </a-radio-button>
          <a-radio-button :value="false" style="width: 50%; text-align: center">
            <span class="px-8"> ندارد </span>
          </a-radio-button>
        </a-radio-group>
      </div>
    </div>

    <div
      v-if="creditHasExpirationDate"
      class="flex flex-row flex-wrap items-center mt-4"
    >
      <b-date-picker
        v-model:value="serverData.startAt"
        custom-id="start-date"
        class="ml-4"
        :range="false"
        place-holder="تاریخ و زمان شروع را انتخاب کنید"
      >
        <template #headline>
          <span style="font-weight: 500; font-size: 16px">
            تاریخ و زمان شروع
          </span>
        </template>
      </b-date-picker>

      <b-date-picker
        v-model:value="serverData.expireAt"
        custom-id="end-date"
        :range="false"
        place-holder="تاریخ و زمان پایان را انتخاب کنید"
      >
        <template #headline>
          <span style="font-weight: 500; font-size: 16px">
            تاریخ و زمان پایان
          </span>
        </template>
      </b-date-picker>
    </div>
  </a-card>
  <div class="text-left">
    <a-button
      type="primary"
      class="button-secondary"
      :disabled="isBtnDisabled"
      @click="nextStep"
    >
      مرحله بعد
    </a-button>
  </div>
</template>
