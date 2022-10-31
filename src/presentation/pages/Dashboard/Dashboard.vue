<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import { onMounted, Ref, ref, watch } from 'vue'
import {
  getFinancialEvaluations,
  initHandler,
} from '@/logics/specific/dashboard.handler'
import { orderLabelOverallStatistics } from '@/core/types/order.type'
import { degreeLabelOverallStatistics } from '@/core/types/degree.type'
import { reportPeriodType } from '@/core/enums/reportType.enum'
import {
  degreeChartOptions,
  orderChartOptions,
} from '@/core/constants/dashboard.options'

const serverData: Ref<
  | {
      degreeLabelOverallStatisticsData?: degreeLabelOverallStatistics
      orderOverallStatistics?: orderLabelOverallStatistics
      reportOverallStatistics?: {
        numberOfCustomers: number
        numberOfFeedbacks: number
        customerWithRepurchase: number
      }
    }
  | undefined
> = ref()

const degreeLabelOverallStatisticsData = ref({
  labels: ['طلایی', 'نقره ای', 'برنزی'],
  datasets: [{}],
})

const orderOverallStatisticsData = ref({
  labels: ['راضی', 'خنثی', 'ناراضی'],
  datasets: [{}],
})

onMounted(async () => {
  serverData.value = await initHandler()

  degreeLabelOverallStatisticsData.value.datasets = [
    {
      data: [
        serverData.value?.degreeLabelOverallStatisticsData?.goldPercentage,
        serverData.value?.degreeLabelOverallStatisticsData?.silverPercentage,
        serverData.value?.degreeLabelOverallStatisticsData?.bronzePercentage,
      ],
      borderWidth: 2,
      backgroundColor: ['#A155B9', '#16BFD6', '#F765A3'],
    },
  ]

  orderOverallStatisticsData.value.datasets = [
    {
      data: [
        serverData.value?.orderOverallStatistics?.happyPercentage,
        serverData.value?.orderOverallStatistics?.neutralPercentage,
        serverData.value?.orderOverallStatistics?.unHappyPercentage,
      ],
      borderWidth: 2,
      backgroundColor: ['#A155B9', '#16BFD6', '#F765A3'],
    },
  ]
})

const selectedReportPeriod: Ref<reportPeriodType> = ref(reportPeriodType.WEEKLY)
watch(
  selectedReportPeriod,
  async () => {
    await getFinancialEvaluations(selectedReportPeriod.value)
    // serverData.value
  },
  { deep: true }
)
</script>
<template>
  <content-layout>
    <template #content-title> داشبورد</template>
    <template #content-body>
      <div class="flex items-center">
        <a-card
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          style="margin-left: 16px"
          :bordered="false"
          class="coupon-info-card"
        >
          <b-chart
            :chart-type="chartVariant.Pie"
            :chart-data="degreeLabelOverallStatisticsData"
            :chart-options="degreeChartOptions"
            :height="200"
            :width="200"
          />
        </a-card>
        <a-card
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          :bordered="false"
          class="coupon-info-card"
        >
          <b-chart
            :chart-type="chartVariant.Pie"
            :chart-data="orderOverallStatisticsData"
            :chart-options="orderChartOptions"
            :height="200"
            :width="200"
          />
        </a-card>
      </div>

      <div class="mt-5 flex flex-row justify-between" style="width: 100%">
        <a-card
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          :bordered="false"
          class="coupon-info-card"
          style="width: 33%"
        >
          <div class="text-center" style="font-weight: 500; font-size: 16px">
            تعداد مشتریان تا به امروز
          </div>
          <div class="text-center" style="font-weight: 500; font-size: 32px">
            {{ serverData?.reportOverallStatistics.numberOfCustomers ?? 0 }}
            مشتری
          </div>
        </a-card>

        <a-card
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          :bordered="false"
          class="coupon-info-card"
          style="width: 33%"
        >
          <div class="text-center" style="font-weight: 500; font-size: 16px">
            تعداد نظرات تا به امروز
          </div>
          <div class="text-center" style="font-weight: 500; font-size: 32px">
            {{ serverData?.reportOverallStatistics.numberOfFeedbacks ?? 0 }}
            نظر
          </div>
        </a-card>

        <a-card
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          :bordered="false"
          class="coupon-info-card"
          style="width: 33%"
        >
          <div class="text-center" style="font-weight: 500; font-size: 16px">
            تعداد مشتریان با خرید مجدد
          </div>
          <div class="text-center" style="font-weight: 500; font-size: 32px">
            {{
              serverData?.reportOverallStatistics.customerWithRepurchase ?? 0
            }}
            مشتری
          </div>
        </a-card>
      </div>

      <div class="mt-10">
        <h3 style="font-size: 24px; font-weight: 700">گزارش کلی</h3>

        <a-radio-group v-model:value="selectedReportPeriod" size="large">
          <a-radio-button :value="reportPeriodType.WEEKLY">
            هفتگی
          </a-radio-button>
          <a-radio-button :value="reportPeriodType.MONTHLY">
            ماهانه
          </a-radio-button>
          <a-radio-button :value="reportPeriodType.ANNUAL">
            سالانه
          </a-radio-button>
        </a-radio-group>
      </div>
    </template>
  </content-layout>
</template>
