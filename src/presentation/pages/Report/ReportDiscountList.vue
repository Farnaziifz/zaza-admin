<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import _ from 'lodash'
import { ref, Ref } from 'vue'
import { promotionUsageReport } from '@/core/types/discounts.type'

//BOOMS 132 Start
const chartData = {
  labels: ['daskldj', 'dasl', 'dsa', '123', 'test', 'test1', 'test2'],
  datasets: [
    {
      label: 'هزینه',
      data: [1, 2, 3, 4, 5, 6, 7],
      borderWidth: 2,
      backgroundColor: '#434348',
    },
    {
      label: 'درآمد',
      data: [5, 6, 7, 8, 9, 10, 11],
      borderWidth: 2,
      backgroundColor: '#7CB5EC',
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'آمار کد تخفیف',
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
      position: 'bottom',
      labels: {
        padding: 40,
        pointStyle: 'circle',
        usePointStyle: true,
        font: {
          size: 12,
          family: 'YekanBakh',
          weight: 700,
        },
      },
    },
  },
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

const discountUsageColumn = [
  {
    title: 'عنوان تخفیف',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'کد تخفیف',
    key: 'code',
    dataIndex: 'code',
  },
  {
    title: 'دسته‌بندی مشتریان هدف',
    key: 'groupsTitle',
    dataIndex: 'groupsTitle',
  },
  {
    title: 'تعداد مشتریان هدف',
    key: 'customersCount',
    dataIndex: 'customersCount',
  },
  {
    title: 'نرخ موفقیت',
    key: 'successRate',
    dataIndex: 'successRate',
  },
  {
    title: 'هزینه',
    key: 'cost',
    dataIndex: 'cost',
  },
  {
    title: 'درآمد',
    key: 'income',
    dataIndex: 'income',
  },
]
const serverData: Ref<promotionUsageReport | undefined> = ref(undefined)
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
          :chart-type="chartVariant.Bar"
          :chart-data="chartData"
          :chart-options="chartOptions"
          :height="484"
          :width="1184"
        />
      </a-card>
      <!--  BOOMS-132 End -->

      <a-table
        class="mt-10"
        :data-source="serverData"
        :columns="discountUsageColumn"
      ></a-table>

      <!--      const onChangePage = async (paginate: TablePaginationConfig) =>-->
      <!--      (churnRateCustomerData.value = await churnCustomerListGETHandler(-->
      <!--      paginate.current,-->
      <!--      [{ field: 'fluxity', operand: '==', value: selectedCustomerType.value }]-->
      <!--      ))-->

      <!--      <a-table-->
      <!--          :columns="customerRetentionColumn"-->
      <!--          :data-source="churnRateCustomerData?.items"-->
      <!--          :pagination="churnRateCustomerListPagination"-->
      <!--          class="mt-2"-->
      <!--          @change="onChangePage"-->
      <!--      >-->
      <!--        <template #bodyCell="{ column, record }">-->
      <!--          <template v-if="column.key === 'totalExpenses'">-->
      <!--            {{ record.totalExpenses }} تومان-->
      <!--          </template>-->
      <!--        </template>-->
      <!--      </a-table>-->
    </template>
  </ContentLayout>
</template>
