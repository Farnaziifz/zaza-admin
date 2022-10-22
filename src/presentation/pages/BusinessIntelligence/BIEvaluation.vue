<script setup lang="ts">
import IncentiveDetailLayout from '@/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import { ref } from 'vue'
const data = ref({
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
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
</script>

<template>
  <IncentiveDetailLayout :has-return-button="false">
    <template #layout-title> ارزیابی از دست رفتن مشتریان</template>
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
          تنظیمات محاسبه نرخ از دست رفتن مشتریان
        </span>
      </a-button>
    </template>

    <template #layout-content>
      <a-card
        :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="coupon-info-card"
      >
        <span style="font-weight: 700; font-size: 20px"> ارزیابی مشتریان </span>
        <div class="flex flex-row items-center justify-around relative mt-4">
          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              نرخ ریزش مشتریان
            </span>
            <span style="font-weight: 700; font-size: 32px">0 درصد</span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان از دست رفته
            </span>
            <span style="font-weight: 700; font-size: 32px">0 درصد</span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان خواب آلود
            </span>
            <span style="font-weight: 700; font-size: 32px">0 مشتری</span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان معمولی
            </span>
            <span style="font-weight: 700; font-size: 32px">0 مشتری</span>
          </div>
        </div>

        <div class="flex justify-center">
          <BChart
            :chart-type="chartVariant.Pie"
            :chart-data="data"
            :chart-options="options"
            :height="200"
            :
            width="200"
          />
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
</template>
