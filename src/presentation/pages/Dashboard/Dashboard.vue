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
  orderChartOptions,
  degreeChartOptions,
  discountCharOptions,
  promotionChartOptions,
  cashbackChartOptions,
} from '@/core/constants/dashboard.options'
import BRfmChart from '@/presentation/components/shared/Organisms/BRfmChart.vue'
import {
  churnRateOverallStatistics,
  retentionRateOverallStatistics,
} from '@/core/types/businessIntelligence'

const serverData: Ref<
  | {
      degreeLabelOverallStatisticsData?: degreeLabelOverallStatistics
      orderOverallStatistics?: orderLabelOverallStatistics
      reportOverallStatistics?: {
        numberOfCustomers: number
        numberOfFeedbacks: number
        customerWithRepurchase: number
      }
      retentionRate?: retentionRateOverallStatistics
      churnRate?: churnRateOverallStatistics
      promotionEvaluation?: { data?: number[]; label?: string[] }
      cashbackEvaluation?: { data?: number[]; label?: string[] }
      creditEvaluation?: { data?: number[]; label?: string[] }
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

const cashbackEvaluationReportChartData = ref({
  labels: [''],
  datasets: [{}],
})

const promotionEvaluationReportChartData = ref({
  labels: [''],
  datasets: [{}],
})

const creditEvaluationReportChartData = ref({
  labels: [''],
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

  cashbackEvaluationReportChartData.value.labels =
    serverData.value?.cashbackEvaluation?.label ?? []

  cashbackEvaluationReportChartData.value.datasets = [
    {
      label: 'درآمد',
      data: serverData.value?.cashbackEvaluation?.data ?? [],
      backgroundColor: '#7CB5EC',
    },
  ]

  creditEvaluationReportChartData.value.labels =
    serverData.value?.creditEvaluation?.label ?? []

  creditEvaluationReportChartData.value.datasets = [
    {
      label: 'درآمد',
      data: serverData.value?.creditEvaluation?.data ?? [],
      backgroundColor: '#7CB5EC',
    },
  ]

  promotionEvaluationReportChartData.value.labels =
    serverData.value?.promotionEvaluation?.label ?? []

  promotionEvaluationReportChartData.value.datasets = [
    {
      label: 'درآمد',
      data: serverData.value?.promotionEvaluation?.data ?? [],
      backgroundColor: '#7CB5EC',
    },
  ]
})

const selectedReportPeriod: Ref<reportPeriodType> = ref(reportPeriodType.WEEKLY)
watch(
  selectedReportPeriod,
  async () => {
    const res = await getFinancialEvaluations(selectedReportPeriod.value)
    cashbackEvaluationReportChartData.value.labels =
      res.cashbackEvaluation?.label ?? []

    cashbackEvaluationReportChartData.value.datasets = [
      {
        label: 'درآمد',
        data: res.cashbackEvaluation?.data ?? [],
        backgroundColor: '#7CB5EC',
      },
    ]

    creditEvaluationReportChartData.value.labels =
      res.creditEvaluation?.label ?? []
    creditEvaluationReportChartData.value.datasets = [
      {
        label: 'درآمد',
        data: res.creditEvaluation?.data ?? [],
        backgroundColor: '#7CB5EC',
      },
    ]

    promotionEvaluationReportChartData.value.labels =
      res.promotionEvaluation?.label ?? []
    promotionEvaluationReportChartData.value.datasets = [
      {
        label: 'درآمد',
        data: res.promotionEvaluation?.data ?? [],
        backgroundColor: '#7CB5EC',
      },
    ]
  },
  { deep: true }
)
</script>
<template>
  <content-layout>
    <template #content-title> داشبورد</template>
    <template #content-body>
      <div class="flex items-center flex-wrap" style="min-height: 250px">
        <a-card
          v-if="serverData"
          :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
          style="margin-left: 16px; height: 250px"
          :bordered="false"
          class="coupon-info-card"
        >
          <div style="font-size: 16px; font-weight: 500" class="mb-10">
            طبقه‌بندی مشتریان براساس RFM
          </div>
          <BRfmChart
            class="mb-14"
            :attention-need-amount="
              serverData?.retentionRate.attentionNeedCustomerPercentage
            "
            :loyal-amount="serverData?.retentionRate?.loyalCustomerPercentage"
            :hero-amount="serverData?.retentionRate?.heroCustomerPercentage"
            :lazy-amount="serverData?.churnRate?.lazyCustomerPercentage"
            :churn-amount="serverData?.churnRate?.lostCustomerPercentage"
            :normal-amount="serverData?.churnRate?.normalCustomerPercentage"
          ></BRfmChart>
        </a-card>
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

        <div class="flex flex-nowrap items-center mt-4">
          <a-card
            :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
            :bordered="false"
            class="coupon-info-card"
            style="width: 33%"
          >
            <BChart
              :chart-type="chartVariant.Bar"
              :chart-data="cashbackEvaluationReportChartData"
              :chart-options="cashbackChartOptions"
              :height="754"
              :width="1184"
              class="mx-4"
            />
          </a-card>

          <a-card
            :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
            :bordered="false"
            class="coupon-info-card"
            style="width: 33%"
          >
            <BChart
              :chart-type="chartVariant.Bar"
              :chart-data="promotionEvaluationReportChartData"
              :chart-options="promotionChartOptions"
              :height="754"
              class="mx-4"
              :width="1184"
            />
          </a-card>

          <a-card
            :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
            :bordered="false"
            class="coupon-info-card"
            style="width: 33%"
          >
            <BChart
              :chart-type="chartVariant.Bar"
              :chart-data="creditEvaluationReportChartData"
              :chart-options="discountCharOptions"
              :height="754"
              class="mx-4"
              :width="1184"
            />
          </a-card>
        </div>
      </div>
    </template>
  </content-layout>
</template>
