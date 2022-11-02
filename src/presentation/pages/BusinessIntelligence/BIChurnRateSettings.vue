<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import { hintType } from '@/core/types/hints.type'
import InputWithHeadlineAndUnit from '@/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import { churnRate } from '@/core/types/businessIntelligence'
import { computed, onMounted, ref, Ref } from 'vue'
import _ from 'lodash'
import {
  initHandler,
  putServerDataHandler,
} from '@/logics/specific/biChurnRate.handler'
import { goToPath } from '@/logics/shared/route.handler'

const numberOfDaysInMonth = 30
const numberOfDaysInWeek = 7

const hints: hintType[] = [
  {
    body: 'مشتری از دست رفته',
    description:
      'بسته به نوع استراتژی کسب‌وکار شما، مشتریانی که بعد از یک مدت زمان مشخص دیگر سفارشی به شما نداده‌اند، از دست رفته‌اند و باید برای بازگشتشان برنامه‌ریزی کنید.',
  },
  {
    body: 'مشتری خواب آلود',
    description:
      'مشتریانی که نزدیک به از دست رفتن هستند اما هنوز به برگشتشان امید داریم، مشتریان خواب‌آلود شما هستند.',
  },
  {
    body: 'مشتری معمولی',
    description:
      'برای افزودن مشتریان هدف، ابتدا در بخش دسته بندی، دسته مورد نظر خود را بسازید. ',
  },
]

const serverData: Ref<churnRate> = ref({
  lazyWeekCount: 0,
  loseWeekCount: 0,
})

const calculateDate = (weeks: number) => {
  const totalDays = weeks * numberOfDaysInWeek
  const months = _.floor(totalDays / numberOfDaysInMonth)
  const remainedDays = totalDays % numberOfDaysInMonth
  const remainedWeeks = _.floor(remainedDays / numberOfDaysInWeek)

  if (_.isNaN(remainedWeeks) || months <= 0) return ''

  return ` معادل ${_.toString(months)} ماه و ${_.toString(remainedWeeks)}هفته`
}

const btnDisabled = computed(() => {
  if (!serverData.value.loseWeekCount) return true
  if (!serverData.value.lazyWeekCount) return true

  return false
})

const isLazySectionDisabled = computed(() => !serverData.value.loseWeekCount)

const sendDataToServer = async () => {
  putServerDataHandler(serverData.value)
  goToPath('/business-intelligence/churn-evaluation')
}

onMounted(async () => {
  const res = await initHandler()
  if (res.data) {
    serverData.value = res.data
    console.log(res.data)
  }
})
</script>

<template>
  <!-- BI stands for 'Business Intelligence' -->

  <content-layout>
    <template #content-title> تنظیمات نرخ از دست دادن مشتری</template>

    <template #content-body>
      <hint-collapse :hints="hints"></hint-collapse>

      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h2 style="font-weight: 700; font-size: 20px">
          محاسبه نرخ از دست دادن مشتری
        </h2>
        <div class="my-6">
          <h3 style="font-weight: 700; font-size: 16px">
            مدت زمان محاسبه مشتری از دست رفته
          </h3>
          <div class="flex flex-row flex-wrap items-end">
            <input-with-headline-and-unit
              v-model:value="serverData.loseWeekCount"
              unit="هفته"
              placeholder="تعداد هفته  را وارد کنید"
            >
              <template #headline>
                <span style="font-weight: 500; font-size: 16px">
                  تعداد هفته
                </span>
              </template>
            </input-with-headline-and-unit>

            <span class="mx-2" style="font-weight: 400; font-size: 16px">
              {{ calculateDate(serverData.loseWeekCount) }}
            </span>
          </div>
        </div>

        <hr />

        <div class="my-6">
          <h3>
            <span
              style="font-weight: 700; font-size: 16px"
              :style="isLazySectionDisabled ? { color: '#BFBFBF' } : {}"
            >
              مدت زمان محاسبه مشتری خواب آلود
            </span>
            <span
              style="font-weight: 400; font-size: 16px"
              :style="isLazySectionDisabled ? { color: '#BFBFBF' } : {}"
            >
              (مدت زمان مشتری خواب آلود نباید از مدت زمان مشتری از دست رفته
              بیشتر باشد)
            </span>
          </h3>

          <div class="flex flex-row flex-wrap items-end">
            <input-with-headline-and-unit
              v-model:value="serverData.lazyWeekCount"
              unit="هفته"
              placeholder="تعداد هفته  را وارد کنید"
              :disabled="isLazySectionDisabled"
            >
              <template #headline>
                <span
                  style="font-weight: 500; font-size: 16px"
                  :style="isLazySectionDisabled ? { color: '#BFBFBF' } : {}"
                >
                  تعداد هفته
                </span>
              </template>
            </input-with-headline-and-unit>

            <span class="mx-2" style="font-weight: 400; font-size: 16px">
              {{ calculateDate(serverData.lazyWeekCount) }}
            </span>
          </div>
        </div>

        <div class="text-left">
          <a-button
            type="primary"
            class="button-secondary"
            :disabled="btnDisabled"
            @click="sendDataToServer"
          >
            ثبت اطلاعات
          </a-button>
        </div>
      </a-card>
    </template>
  </content-layout>
</template>
