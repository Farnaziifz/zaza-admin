<script lang="ts" setup>
import { computed, onMounted, ref, Ref, watch } from 'vue'
import BConfirmModal from '@/presentation/components/shared/atoms/BConfirmModal.vue'
import { t } from 'vui18n'
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import InputWithHeadlineAndUnit from '@/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import {
  changeStatusHandler,
  initHandler,
  sendCashbackDataToServer,
} from '@/logics/specific/cashback.handler'
import { cashback } from '@/core/types/cashback.type'
import { cashbackType, durationTypeEnum } from '@/core/enums/cashback.enum'
import { cashbackComputedPropertiesFactory } from '@/presentation/factory/specific/Cashback/cashbackComputedProperties.factory'

const serverData: Ref<cashback> = ref({
  isActive: false,
  minimumAmount: 0,
})

const { isBtnDisabled } = cashbackComputedPropertiesFactory(serverData)

const hasExpirationDate = ref(false)
const showModal = ref(false)

const dateTimeInputUnit = computed(() =>
  t(`types.cashback.duration.${serverData.value.durationType}`)
)

const openSubmissionModal = () => {
  showModal.value = true
}
const closeSubmissionModal = () => {
  showModal.value = false
}

const changeCashbackActivation = async () => {
  await changeStatusHandler()
  await init()

  closeSubmissionModal()
}

const submitDataHandler = async () => {
  return await sendCashbackDataToServer(serverData.value)
}

const init = async () => {
  const res = await initHandler()
  if (res.status === 200 || res.status === 204) {
    serverData.value = res.data.data as cashback
    serverData.value.durationType === durationTypeEnum.NONE
      ? (hasExpirationDate.value = false)
      : (hasExpirationDate.value = true)
  }
}
watch(
  serverData,
  () => {
    if (
      serverData.value.durationType === durationTypeEnum.NONE &&
      hasExpirationDate.value
    )
      serverData.value.durationType = durationTypeEnum.DAILY
  },
  { deep: true }
)
watch(
  hasExpirationDate,
  () => {
    if (!hasExpirationDate.value)
      serverData.value.durationType = durationTypeEnum.NONE
    else serverData.value.durationType = durationTypeEnum.DAILY
  },
  { deep: true }
)

onMounted(async () => {
  await init()
})
</script>
<template>
  <content-layout>
    <template #content-title> کش بک</template>
    <template #content-body>
      <div>
        <a-card style="margin: 8px 0; background-color: #f6f6f6">
          <div class="flex justify-between">
            <h2>فعال سازی کش‌بک</h2>
            <a-switch
              :checked-value="serverData.isActive"
              @click="openSubmissionModal"
            />
          </div>
        </a-card>

        <hint-collapse
          :hints="[{ body: t('pages.LabelSettingsDegree.hint') }]"
          header="راهنما"
        />

        <a-card style="margin: 8px 0; background-color: #f6f6f6">
          <!--  This card is for inputs and ...    -->

          <!--  TODO => minimum paid money input \ if(serverData.isActive)   -->

          <div v-if="serverData.isActive">
            <input-with-headline-and-unit
              v-model:value="serverData.minimumAmount"
              headline="حداقل مبلغ برای دریافت کش‌بک"
              placeholder="مبلغ مورد نظر را وارد کنید"
              unit="تومان"
              style="max-width: 256px"
            />
          </div>

          <div class="flex flex-wrap items-center mt-4">
            <!-- TODO => cashback type input <radio<cash | percentage>> disabled if serverData.isActive -->

            <div class="flex flex-col">
              <span style="font-weight: 500; font-size: 16px"> نوع کش‌بک </span>
              <a-radio-group
                v-model:value="serverData.type"
                :disabled="!serverData.isActive"
                size="large"
              >
                <a-radio-button :value="cashbackType.PRICE">
                  <span class="px-12"> تومانی </span>
                </a-radio-button>
                <a-radio-button :value="cashbackType.PERCENTAGE" class="px-12">
                  <span class="px-12"> درصدی </span>
                </a-radio-button>
              </a-radio-group>
            </div>

            <!-- TODO => expire Time <radio<boolean>>  disabled if serverData.isActive -->

            <div class="flex flex-col mx-4">
              <span style="font-weight: 500; font-size: 16px"> مدت مصرف</span>
              <a-radio-group
                v-model:value="hasExpirationDate"
                :disabled="!serverData.isActive"
                size="large"
              >
                <a-radio-button :value="true">
                  <span class="px-12"> دارد </span>
                </a-radio-button>
                <a-radio-button :value="false">
                  <span class="px-12"> ندارد </span>
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>

          <div v-if="serverData.isActive" class="flex flex-wrap mt-4">
            <div
              v-if="serverData.type === cashbackType.PERCENTAGE"
              class="flex flex-wrap"
            >
              <!-- TODO => cashBack precentage <number> \ if(serverData.isActive) \  if (cashbackType === precentage)   -->
              <input-with-headline-and-unit
                v-model:value="serverData.amount"
                unit="درصد"
                placeholder="درصد مورد نظر را وارد کنید"
                class="ml-4"
              >
                <template #headline>
                  <span style="font-weight: 500; font-size: 16px">
                    درصد کش‌بک
                  </span>
                </template>
              </input-with-headline-and-unit>

              <!-- TODO => cashBack maximum amount <number> \ if(serverData.isActive) \  if (cashbackType === precentage)   -->
              <input-with-headline-and-unit
                v-model:value="serverData.maximumPrice"
                unit="تومان"
                placeholder="سقف را وارد کنید"
                class="ml-4"
              >
                <template #headline>
                  <span style="font-weight: 500; font-size: 16px">
                    سقف قیمتی
                  </span>
                </template>
              </input-with-headline-and-unit>
            </div>

            <!-- TODO => cashback amount <toman | rial> \ if(serverData.isActive) \ if(cashbackType === cash) -->
            <input-with-headline-and-unit
              v-if="serverData.type === cashbackType.PRICE"
              v-model:value="serverData.amount"
              unit="تومان"
              placeholder="مبلغ مورد نظر را وارد کنید"
              class="ml-4"
            >
              <template #headline>
                <span style="font-weight: 500; font-size: 16px">
                  مبلغ کش‌بک
                </span>
              </template>
            </input-with-headline-and-unit>

            <div v-if="hasExpirationDate" class="flex flex-wrap">
              <!-- TODO => expiration time  \ if(serverData.isActive) \ if(expireTime === true)  -->
              <div class="flex flex-col ml-4">
                <span style="font-weight: 500; font-size: 16px">نوع مدت</span>
                <a-radio-group v-model:value="serverData.durationType">
                  <a-radio-button :value="durationTypeEnum.DAILY">
                    <span> روز </span>
                  </a-radio-button>
                  <a-radio-button :value="durationTypeEnum.WEEKLY">
                    <span> هفته </span>
                  </a-radio-button>
                  <a-radio-button :value="durationTypeEnum.MONTHLY">
                    <span> ماه </span>
                  </a-radio-button>
                </a-radio-group>
              </div>
              <!-- TODO => time \ if(serverData.isActive) \  if(expireTime === true) -->
              <input-with-headline-and-unit
                v-model:value="serverData.duration"
                :unit="dateTimeInputUnit"
                :placeholder="'تعداد ' + dateTimeInputUnit + ' را وارد کنید'"
                class="ml-4"
              >
                <template #headline>
                  <span style="font-weight: 500; font-size: 16px"> مدت </span>
                </template>
              </input-with-headline-and-unit>
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
          @ok="changeCashbackActivation"
          @cancel="closeSubmissionModal"
        />
      </div>
    </template>
  </content-layout>
</template>
