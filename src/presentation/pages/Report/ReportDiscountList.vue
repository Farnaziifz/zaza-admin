<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import _ from 'lodash'

//BOOMS 132 Start
const chartData = {
  labels: ['daskldj', 'dasl', 'dsa', '123', 'test', 'test1', 'test2'],
  datasets: [
    {
      label: 'Fully Rounded',
      data: [1, 2, 3, 4, 5, 6, 7],
      borderWidth: 2,
      backgroundColor: '#434348',
    },
    {
      label: 'Small Radius',
      data: [5, 6, 7, 8, 9, 10, 11],
      borderWidth: 2,
      backgroundColor: '#7CB5EC',
    },
  ],
}

const chartOptions = {
  responsive: true,
  scales: {
    y: {
      ticks: {
        callback: (value: number | string, index: number) => {
          return _.toString(index) + ' dkjashd'
        },
      },
    },
  },
}
//BOOMS 132 End
</script>
<template>
  <ContentLayout>
    <!--  BOOMS-132 Start -->
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
          :chart-options="chartOptions"
          :height="484"
          :width="1184"
        />
      </a-card>
      <!--  BOOMS-132 End -->
    </template>
  </ContentLayout>
</template>
