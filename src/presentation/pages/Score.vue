<script lang="ts" setup>
import BConfirmModal from '@/presentation/components/shared/atoms/BConfirmModal.vue'
import {
  changeScoreStatusHandler,
  initHandler,
  sendScoreDataToServer,
} from '@/logics/specific/score.handler'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { score } from '@/core/types/score.type'
import { computed, onMounted, ref, Ref } from 'vue'
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'
import { scoreType } from '@/core/enums/scoreType.enum'
import InputWithHeadlineAndUnit from '@/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import _ from 'lodash'

const serverData: Ref<score> = ref({
  unit: 0,
  amount: 0,
  isActive: false,
  type: undefined,
})
const showModal = ref(false)

const closeSubmissionModal = () => (showModal.value = false)
const openSubmissionModal = () => (showModal.value = true)

const changeScoreActivation = async () => {
  closeSubmissionModal()
  await changeScoreStatusHandler()
  await initialize()
}

const initialize = async () => {
  const res = await initHandler()
  if (res.data) serverData.value = res.data
  if (res.data && serverData.value.type === scoreType.PRICE)
    serverData.value.unit = serverData.value.unit / 10
}

// score option factory
const scoreOptions: Ref<{ value?: string; label?: string }[]> = ref([])
for (const key in scoreType) {
  scoreOptions.value.push({ value: key, label: t(`types.score.${key}`) })
}
//----

const submitDataHandler = async () =>
  await sendScoreDataToServer(serverData.value)

const isBtnDisabled = computed(() => {
  if (!serverData.value.isActive) return true

  if (
    !_.toNumber(serverData.value.unit) ||
    !_.toNumber(serverData.value.amount)
  )
    return true

  return false
})

onMounted(async () => {
  await initialize()
})
</script>

<template>
  <content-layout>
    <template #content-title> امتیاز</template>
    <template #content-body>
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <div class="flex justify-between">
          <h2 style="font-weight: 700; font-size: 20px">فعال سازی امتیاز</h2>
          <a-switch
            :checked-value="serverData.isActive"
            @click="openSubmissionModal"
          />
        </div>
      </a-card>

      <hint-collapse
        :hints="[
          {
            body: t('pages.Cashback.hints.hintBody'),
            description: t('pages.Cashback.hints.hintDescription'),
          },
        ]"
      />

      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h2>اطلاعات امتیاز</h2>

        <div class="mt-4">
          <div class="flex flex-col">
            <span style="font-weight: 500; font-size: 16px">
              نحوه دریافت امتیاز
            </span>
            <b-select
              v-model:value="serverData.type"
              :disabled="!serverData.isActive"
              style="width: 254px"
              suffix-icon-color="#ff003d"
              :options="scoreOptions"
              place-holder="نحوه دریافت را انتخاب کنید"
            />
          </div>

          <div
            v-if="serverData.isActive && serverData.type === scoreType.ORDER"
            class="flex flex-wrap"
          >
            <input-with-headline-and-unit
              v-model:value="serverData.unit"
              headline="مقدار"
              unit="سفارش"
              placeholder="تعداد سفارش را وارد کنید"
              class="ml-4"
            />

            <input-with-headline-and-unit
              v-model:value="serverData.amount"
              unit="امتیاز"
              placeholder="میزان امتیاز را وارد کنید"
              headline="میزان امتیاز"
            />
          </div>

          <div
            v-if="serverData.isActive && serverData.type === scoreType.PRICE"
            class="flex flex-wrap"
          >
            <input-with-headline-and-unit
              v-model:value="serverData.unit"
              headline="مبلغ"
              unit="تومان"
              class="ml-4"
              placeholder="مبلغ را وارد کنید"
            />

            <input-with-headline-and-unit
              v-model:value="serverData.amount"
              unit="امتیاز"
              placeholder="میزان امتیاز را وارد کنید"
              headline="میزان امتیاز"
            />
          </div>
        </div>
      </a-card>
      <div class="text-left">
        <a-button
          type="primary"
          style="padding: 0 56px"
          class="button-secondary"
          :disabled="isBtnDisabled"
          @click="submitDataHandler"
        >
          ثبت تغییرات
        </a-button>
      </div>

      <b-confirm-modal
        v-model:value="showModal"
        cancel-text="بستن"
        :ok-type="serverData.isActive ? 'danger' : 'success'"
        :ok-text="
          serverData.isActive
            ? t('pages.LabelSettingsDegree.modalDeActiveButtonContent')
            : t('pages.LabelSettingsDegree.modalActiveButtonContent')
        "
        :title="
          serverData.isActive
            ? 'غیر فعال کردن کش‌‍بک'
            : 'فعال سازی غیر فعال کردن کش‌‍بک'
        "
        :content="
          serverData.isActive
            ? 'آیا از غیرفعال کردن کش‌بک مطمئن هستید؟'
            : 'آیا از فعال کردن کش‌بک مطمئن هستید؟'
        "
        @ok="changeScoreActivation"
        @cancel="closeSubmissionModal"
      />
    </template>
  </content-layout>
</template>
