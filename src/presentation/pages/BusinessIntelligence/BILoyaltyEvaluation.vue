<script setup lang="ts">
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { retentionLoyalityRateOverallStatistics } from '../../../core/types/businessIntelligence'
import { ref, Ref, onMounted } from 'vue'
import { initHandler } from '../../../logics/specific/retationLoyality.handler'
import { chartVariant } from '@/core/enums/chartType.enum'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'

const overallStatisticsData: Ref<
  retentionLoyalityRateOverallStatistics | undefined
> = ref(undefined)

const dataCh = ref({
  labels: ['مشتریان قهرمان', 'مشتریان وفادار', 'نیازمند تعجب'],
  datasets: [{}],
})

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right',
    },
  },
})

onMounted(async () => {
  const data = await initHandler()
  overallStatisticsData.value = data.data
  dataCh.value.datasets = [
    {
      label: 'test',
      data: [
        overallStatisticsData.value?.heroCustomerPercentage ?? 0,
        overallStatisticsData.value?.loyalCustomerPercentage ?? 0,
        overallStatisticsData.value?.attentionNeedCustomerPercentage ?? 0,
      ],
      backgroundColor: ['#A155B9', '#16BFD6', '#F765A3'],
      hoverOffset: 4,
    },
  ]
})
</script>

<template>
  <IncentiveDetailLayout :has-return-button="false">
    <template #layout-title>ارزیابی وفاداری مشتریان</template>
    <template #layout-actions>
      <a-button
        type="primary"
        class="button-secondary items-center"
        size="large"
      >
        <template #icon>
          <setting-outlined />
        </template>
        <span
          style="font-weight: 400; font-size: 16px"
          class="flex items-center"
        >
          تنظیمات محاسبه نرخ وفادارسازی مشتریان
        </span>
      </a-button>
    </template>
    <template #layout-content>
      <a-card
        :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="eval-info-card"
      >
        <span style="font-weight: 700; font-size: 20px"> ارزیابی مشتریان </span>
        <div class="flex flex-row items-center justify-around relative mt-4">
          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              نرخ وفادارسازی مشتریان
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.customerRetentionRate }} درصد
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان قهرمان
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.heroCustomer }}
              مشتری
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان وفادار
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.loyalCustomer }} مشتری
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان نیازمند تعجب
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.attentionNeedCustomer }} مشتری
            </span>
          </div>
        </div>
        <div class="flex justify-center">
          <BChart
            :chart-type="chartVariant.Pie"
            :chart-data="dataCh"
            :chart-options="options"
            :height="400"
            :width="400"
          />
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
</template>
