<script async setup lang="ts">
import { ComputedRef, onBeforeMount, ref, Ref } from 'vue'
import BSelect from '../components/shared/atoms/BSelect.vue'
import { degreeOptions } from '../../core/constants/degree.options'
import { scoreType } from '../../core/enums/scoreType.enum'
import HintCollapse from '../components/shared/organisms/HintCollapse.vue'
import InputWithHeadlineAndUnit from '../components/shared/molecules/InputWithHeadlineAndUnit.vue'
import { computedPropertiesFactory } from '../factory/specific/labelSettings/labelSettingsDegreeComputedProperties.factory'
import ContentLayout from '../layouts/ContentLayout.vue'
import {
  changeServerDataHandler,
  initPageHandler,
} from '../../logics/specific/labelSettingsDegree.handler'
import { score } from '../../core/types/score.type'
import { t } from 'vui18n'

const serverData: Ref<score> = ref({
  amount: 0,
  isActive: false,
  type: 'ORDER',
  unit: 0,
})
const value: Ref<string | null> = ref('')

const computedProperties = computedPropertiesFactory(value, serverData)

const isSubmitButtonDisabled: ComputedRef<boolean> =
  computedProperties.isSubmitButtonDisabledComputedFactory()

onBeforeMount(async () => {
  serverData.value = await initPageHandler()
  value.value = serverData.value.type
})

const changeServerData = async () => {
  await changeServerDataHandler(serverData.value)
}
</script>

<template>
  <content-layout>
    <template #content-title> درجه</template>

    <template #content-body>
      <hint-collapse
        :hints="[{ body: t('label-settings-degree-hint') }]"
        header="راهنما"
      />

      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <div class="flex justify-between">
          <h2>فعال سازی اطلاع رسانی برچسب</h2>
          <a-switch v-model:checked="serverData.isActive" />
        </div>
      </a-card>

      <a-card style="margin: 8px 0; background-color: #f6f6f6" disabled="true">
        <h2>اطلاعات درجه</h2>

        <div class="mt-4">
          <h3>نوع محاسبه درجه</h3>
          <b-select
            v-model:value="value"
            style="width: 254px"
            :disabled="!serverData.isActive"
            :options="degreeOptions"
            suffix-icon-color="#ff003d"
            place-holder="نوع محاسبه را انتخاب کنید"
          />
        </div>

        <div
          v-if="value === scoreType.ORDER"
          class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
            v-model:value="serverData.unit"
            class="ml-4 sm:mb-4"
            headline="تعداد سفارش"
            unit="تعداد"
            placeholder=" تعداد سفارش را وارد کنید"
            style="width: 254px"
          />

          <input-with-headline-and-unit
            v-model:value="serverData.amount"
            class="ml-4 sm:mb-4"
            unit="درجه"
            headline="مقدار درجه"
            style="width: 254px"
            placeholder="مقدار درجه را وارد کنید"
          />
        </div>

        <div
          v-else-if="value === scoreType.PRICE"
          class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
            v-model:value="serverData.unit"
            class="ml-4 sm:mb-4"
            unit="تومان"
            placeholder="مبلغ را وارد کنید"
            style="width: 254px"
            headline="مبلغ مورد نظر"
          />

          <input-with-headline-and-unit
            v-model:value="serverData.amount"
            class="ml-4 sm:mb-4"
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
          class="button-secondary"
          @click="changeServerData"
        >
          ثبت تغییرات
        </a-button>
      </div>
    </template>
  </content-layout>
</template>
