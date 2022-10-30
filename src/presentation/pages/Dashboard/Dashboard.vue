<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import { onMounted, Ref, ref } from 'vue'
import { initHandler } from '@/logics/specific/dashboard.handler'
import { orderLabelOverallStatistics } from '@/core/types/order.type'
import { degreeLabelOverallStatistics } from '@/core/types/degree.type'

const serverData: Ref<
  | {
      degreeLabelOverallStatisticsData?: degreeLabelOverallStatistics
      orderOverallStatistics?: orderLabelOverallStatistics
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

const degreeChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی جایگاه مشتریان',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        textAlign: 'right',
        font: {
          size: 14,
          family: 'YekanBakh',
          weight: 500,
        },
      },
    },
  },
}

const orderChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'ارزیابی رضایتمندی مشتریان',
      align: 'end',
      padding: {
        bottom: 24,
      },
      font: {
        size: 16,
        family: 'YekanBakh',
        weight: 500,
      },
    },
    legend: {
      display: true,
      position: 'right',
      labels: {
        pointStyle: 'circle',
        usePointStyle: true,
        textAlign: 'right',
        font: {
          size: 14,
          family: 'YekanBakh',
          weight: 500,
        },
      },
    },
  },
}
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
    </template>
  </content-layout>
</template>
