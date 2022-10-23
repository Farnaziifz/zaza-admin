<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'

const chartData = {
  labels: ['daskldj', 'dasl', 'dsa', '123'],
  datasets: [
    {
      label: 'Fully Rounded',
      data: [1, 2, 3, 4],
      borderWidth: 2,
      backgroundColor: '#434348',
    },
    {
      label: 'Small Radius',
      data: [5, 6, 7, 8],
      borderWidth: 2,
      backgroundColor: '#7CB5EC',
    },
  ],
}
</script>
<template>
  <ContentLayout>
    <template #content-title>
      <span style="font-weight: 700; font-size: 24px"> گزارش کد تخفیف </span>
    </template>

    <template #content-body>
      <a-card
        :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="coupon-info-card"
      >
        <BChart
          chart-type="Bar"
          :chart-data="chartData"
          :chart-options="{ responsive: true }"
          :height="484"
          :width="1184"
        ></BChart>
      </a-card>
    </template>
  </ContentLayout>
</template>
