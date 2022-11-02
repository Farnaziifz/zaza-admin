<script setup lang="ts">
import IncentiveDetailLayoutVue from '@/presentation/layouts/IncentiveDetailLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import { ref, computed, onBeforeMount, createVNode } from 'vue'
import { retantionRateCalulatedType } from '../../../core/enums/retantionRateType.enum'
import { t } from 'vui18n'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import {
  updateRetantionRate,
  retantionRateGetDetails,
} from '../../../logics/specific/retationLoyality.handler'
import _ from 'lodash'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { goToPath } from '@/logics/shared/route.handler'

const selectedCalculatedType = ref('')
const calculatedTypeOptions: any[] = []
const heroOrderCount = ref('')
const normalOrderCount = ref('')
const heroWeekCount = ref('')
const normalWeekCount = ref('')
const heroPayPrice = ref('')
const normalPayPrice = ref('')
onBeforeMount(async () => {
  const res = await retantionRateGetDetails()
  console.log(res)
  heroWeekCount.value = _.toString(res?.heroWeekCount)
  normalWeekCount.value = _.toString(res?.loyalWeekCount)

  if (res?.type === 'PER_PRICE') {
    selectedCalculatedType.value = res?.type ? res.type : ''
    heroPayPrice.value = _.toString(res?.heroValueCount)
    normalPayPrice.value = _.toString(res?.loyalValueCount)
  } else if (res?.type === 'PER_ORDER') {
    selectedCalculatedType.value = res?.type ? res.type : ''
    heroOrderCount.value = _.toString(res?.heroValueCount)
    normalOrderCount.value = _.toString(res?.loyalValueCount)
  }
})
for (const type in retantionRateCalulatedType)
  calculatedTypeOptions.push({
    value: type,
    label: t(`types.retantionRateCalculated.${type}`),
  })

const changeCalculated = () => {
  heroOrderCount.value = ''
  normalOrderCount.value = ''
  heroWeekCount.value = ''
  normalWeekCount.value = ''
  normalPayPrice.value = ''
  heroPayPrice.value = ''
}

const btnDisabled = computed(() => {
  const perOrder =
    heroOrderCount.value &&
    normalOrderCount.value &&
    normalWeekCount.value &&
    heroWeekCount.value
  const perPrice =
    heroWeekCount.value &&
    normalPayPrice.value &&
    heroPayPrice.value &&
    normalWeekCount.value

  if (selectedCalculatedType.value === 'PER_ORDER') {
    if (perOrder) {
      return false
    }
  } else if (selectedCalculatedType.value === 'PER_PRICE') {
    if (perPrice) return false
  }
  return true
})

const confirm = () => {
  Modal.confirm({
    title: 'تغییر اطلاعات',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'در صورت ثبت تغییرات اطلاعات قبلی مشتریان پاک‌ می‍‌شود.',
    okText: 'بستن',
    cancelText: 'تغییر',
    onOk() {
      validateForm()
    },
  })
}

const validateForm = () => {
  if (selectedCalculatedType.value === 'PER_ORDER') {
    if (_.toNumber(heroOrderCount.value) < _.toNumber(normalOrderCount.value)) {
      showErrorMessage(
        'تعداد سفارش مشتریان وفادار نباید بیشتر از تعداد سفارش مشتریان قهرمان باشد'
      )
      return
    }
  } else if (selectedCalculatedType.value === 'PER_PRICE') {
    if (heroPayPrice.value < normalPayPrice.value) {
      showErrorMessage(
        'مبلغ پرداختی مشتریان وفادار نباید بیشتر از مبلغ پرداختی مشتریان قهرمان باشد'
      )
      return
    }
  }
  onSubmit()
}

const onSubmit = async () => {
  if (selectedCalculatedType.value === 'PER_ORDER') {
    await updateRetantionRate({
      type: selectedCalculatedType.value,
      heroWeekCount: _.toNumber(heroWeekCount.value),
      heroValueCount: _.toNumber(heroOrderCount.value),
      loyalWeekCount: _.toNumber(normalWeekCount.value),
      loyalValueCount: _.toNumber(normalOrderCount.value),
    })
    goToPath('/business-intelligence/loyalty-evaluation')
  } else {
    await updateRetantionRate({
      type: selectedCalculatedType.value,
      heroWeekCount: _.toNumber(heroWeekCount.value),
      heroValueCount: _.toNumber(heroPayPrice.value),
      loyalValueCount: _.toNumber(normalPayPrice.value),
      loyalWeekCount: _.toNumber(normalWeekCount.value),
    })
    goToPath('/business-intelligence/loyalty-evaluation')
  }
}
</script>
<template>
  <IncentiveDetailLayoutVue>
    <template #layout-title>تنظیمات نرخ وفادار سازی مشتریان</template>
    <template #layout-content>
      <hint-collapse
        :hints="[
          {
            body: 'مشتری قهرمان',
            description:
              'بسته به نوع استراتژی کسب‌وکار شما، مشتریانی که بعد از یک مدت زمان مشخص دیگر سفارشی به شما نداده‌اند، از دست رفته‌اند و باید برای بازگشتشان برنامه‌ریزی کنید.',
          },
          {
            body: 'مشتری وفادار',
            description:
              'مشتریانی که نزدیک به از دست رفتن هستند اما هنوز به برگشتشان امید داریم، مشتریان خواب‌آلود شما هستند.',
          },
        ]"
      />
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
          محاسبه نرخ از وفاداری مشتری
        </h3>
        <div class="flex items-center">
          <div class="ml-10">
            <div class="input-title mt-6">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه مشتریان قهرمان
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه
              </p>
            </div>
            <BSelect
              v-model:value="selectedCalculatedType"
              placeholder="نوع کوپن را انتخاب کنبد"
              :options="calculatedTypeOptions"
              style="width: 280px"
              @change="changeCalculated"
            />
          </div>
          <div class="mt-12" v-if="selectedCalculatedType === 'PER_ORDER'">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                تعداد سفارش
              </p>
            </div>
            <InputWithHeadlineAndUnit
              v-model:value="heroOrderCount"
              unit="تعداد"
              placeholder="تعداد سفارش  را وارد کنید"
            />
          </div>
          <div class="mt-12" v-if="selectedCalculatedType === 'PER_PRICE'">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                مبلغ پرداختی
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="تومان"
              placeholder="مبلغ پرداختی را وارد کنید"
              v-model:value="heroPayPrice"
            />
          </div>
          <div class="mt-6 mr-10">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                مدت زمان محاسبه مشتریان قهرمان
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                تعداد هفته
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="هفته"
              placeholder="تعداد هفته  را وارد کنید"
              v-model:value="heroWeekCount"
            />
          </div>
        </div>
        <div class="line"></div>
        <div
          class="flex items-center"
          v-if="selectedCalculatedType === 'PER_ORDER'"
        >
          <div>
            <div class="input-title mt-6">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه مشتریان وفادار
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه
              </p>
            </div>
            <BSelect
              v-model:value="selectedCalculatedType"
              placeholder="نوع کوپن را انتخاب کنبد"
              :options="calculatedTypeOptions"
              style="width: 280px"
              :disabled="true"
            />
          </div>
          <div class="mt-12 mr-10">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                تعداد سفارش
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="هفته"
              placeholder="تعداد سفارش  را وارد کنید"
              :disabled="!heroOrderCount"
              v-model:value="normalOrderCount"
            />
          </div>
          <div class="mt-6 mr-10">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                مدت زمان محاسبه مشتریان وفادار
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                تعداد هفته
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="هفته"
              placeholder="تعداد هفته  را وارد کنید"
              :disabled="!heroWeekCount"
              v-model:value="normalWeekCount"
            />
          </div>
        </div>
        <div
          class="flex items-center"
          v-if="selectedCalculatedType === 'PER_PRICE'"
        >
          <div>
            <div class="input-title mt-6">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه مشتریان وفادار
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                نوع محاسبه
              </p>
            </div>
            <BSelect
              v-model:value="selectedCalculatedType"
              placeholder="نوع کوپن را انتخاب کنبد"
              :options="calculatedTypeOptions"
              style="width: 280px"
              :disabled="true"
            />
          </div>
          <div class="mt-12 mr-10">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                مبلغ پرداختی
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="تومان"
              placeholder="مبلغ پرداختی را وارد کنید"
              :disabled="!heroPayPrice"
              v-model:value="normalPayPrice"
            />
          </div>
          <div class="mt-6 mr-10">
            <div class="input-title">
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                مدت زمان محاسبه مشتریان وفادار
              </p>
              <p style="font-weight: 500; font-size: 16px" class="mb-0">
                تعداد هفته
              </p>
            </div>
            <InputWithHeadlineAndUnit
              unit="هفته"
              placeholder="تعداد هفته  را وارد کنید"
              :disabled="!heroWeekCount"
              v-model:value="normalWeekCount"
            />
          </div>
        </div>
        <div class="line" v-if="selectedCalculatedType"></div>
        <div class="btn-container flex justify-end">
          <a-button
            type="primary"
            class="button-secondary"
            :disabled="btnDisabled"
            @click="confirm"
          >
            <span>ثبت اطلاعات</span>
          </a-button>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayoutVue>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #e7e7e7;
  margin: 24px 0;
}
</style>
