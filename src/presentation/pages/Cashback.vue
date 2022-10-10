<script lang="ts" setup>
import { computed, ref, Ref } from 'vue'
import BConfirmModal from '@/presentation/components/shared/atoms/BConfirmModal.vue'
import { t } from 'vui18n'
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import InputWithHeadlineAndUnit from '@/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'

const serverData = ref({
  isActive: true,
})
const showModal = ref(false)
const minimumPaidMoneyForCashback = ref()
const cashbackType: Ref<'percentage' | 'cash' | undefined> = ref(undefined)
const cashbackHasExpirationDate: Ref<boolean> = ref(false)
const cashbackPercentage = ref()
const cashbackPercentageMaximumPrice = ref()
const cashbackCashAmount = ref()
const expireDateType: Ref<'daily' | 'weekly' | 'monthly'> = ref('daily')
const expireDateTime = ref()

const dateTimeInputUnit = computed(() => {
  if (expireDateType.value === 'daily') return 'روز'
  else if (expireDateType.value === 'weekly') return 'هفته'
  else return 'ماه'
})

const isBtnDisabled = computed((): boolean => {
  if (!serverData.value.isActive) return true

  if (!cashbackType.value) return true

  if (!minimumPaidMoneyForCashback.value) return true

  if (cashbackType.value === 'cash' && !cashbackCashAmount.value) return true

  if (
    cashbackType.value === 'percentage' &&
    (!cashbackPercentage.value || !cashbackPercentageMaximumPrice.value)
  )
    return true

  if (cashbackHasExpirationDate.value && !expireDateTime.value) return true

  return false
})

const openSubmissionModal = () => {
  showModal.value = true
}
const changeCashbackActivation = () => {
  serverData.value.isActive = !serverData.value.isActive
  showModal.value = false
}

const submitDataHandler = async () => {
  return
}
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

          <input-with-headline-and-unit
            v-if="serverData.isActive"
            v-model:value="minimumPaidMoneyForCashback"
            headline="حداقل مبلغ برای دریافت کش‌بک"
            placeholder="مبلغ مورد نظر را وارد کنید"
            unit="تومان"
            style="max-width: 256px"
          />

          <div class="flex flex-wrap items-center mt-4">
            <!-- TODO => cashback type input <radio<cash | percentage>> disabled if serverData.isActive -->

            <div class="flex flex-col">
              <span style="font-weight: 500; font-size: 16px"> نوع کش‌بک </span>
              <a-radio-group
                v-model:value="cashbackType"
                :disabled="!serverData.isActive"
                size="large"
              >
                <a-radio-button value="cash">
                  <span class="px-12"> تومانی </span>
                </a-radio-button>
                <a-radio-button value="percentage" class="px-12">
                  <span class="px-12"> درصدی </span>
                </a-radio-button>
              </a-radio-group>
            </div>

            <!-- TODO => expire Time <radio<boolean>>  disabled if serverData.isActive -->

            <div class="flex flex-col mx-4">
              <span style="font-weight: 500; font-size: 16px"> مدت مصرف</span>
              <a-radio-group
                v-model:value="cashbackHasExpirationDate"
                :disabled="!serverData.isActive"
                size="large"
              >
                <a-radio-button value="true">
                  <span class="px-12"> دارد </span>
                </a-radio-button>
                <a-radio-button value="false">
                  <span class="px-12"> ندارد </span>
                </a-radio-button>
              </a-radio-group>
            </div>
          </div>

          <div v-if="serverData.isActive" class="flex flex-wrap mt-4">
            <div v-if="cashbackType === 'percentage'" class="flex flex-wrap">
              <!-- TODO => cashBack precentage <number> \ if(serverData.isActive) \  if (cashbackType === precentage)   -->
              <input-with-headline-and-unit
                v-model:value="cashbackPercentage"
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
                v-model:value="cashbackPercentageMaximumPrice"
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
              v-if="cashbackType === 'cash'"
              v-model:value="cashbackCashAmount"
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

            <div
              v-if="cashbackHasExpirationDate === 'true'"
              class="flex flex-wrap"
            >
              <!-- TODO => expiration time  \ if(serverData.isActive) \ if(expireTime === true)  -->
              <div class="flex flex-col ml-4">
                <span style="font-weight: 500; font-size: 16px">نوع مدت</span>
                <a-radio-group v-model:value="expireDateType">
                  <a-radio-button value="daily">
                    <span> روز </span>
                  </a-radio-button>
                  <a-radio-button value="weekly">
                    <span> هفته </span>
                  </a-radio-button>
                  <a-radio-button value="monthly">
                    <span> ماه </span>
                  </a-radio-button>
                </a-radio-group>
              </div>
              <!-- TODO => time \ if(serverData.isActive) \  if(expireTime === true) -->
              <input-with-headline-and-unit
                v-model:value="expireDateTime"
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
        />
      </div>
    </template>
  </content-layout>
</template>
