<script setup lang="ts">
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'

import { ref } from 'vue'

const dataCh = ref({
  labels: ['مشتریان قهرمان', 'مشتریان وفادار', 'نیازمند تعجب'],
  datasets: [{}],
})

const customerRetentionColumn = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'تعداد سفارش',
    key: 'numberOfOrder',
    dataIndex: 'numberOfOrder',
  },
  {
    title: 'مبلغ پرداختی',
    key: 'totalExpenses',
    dataIndex: 'totalExpenses',
  },
]

const selectedCustomerType = ref(fluxityType.NORMAL)

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'right',
    },
  },
})
const onChangePage = async (paginate: TablePaginationConfig) =>
  (churnRateCustomerData.value = await churnCustomerListGETHandler(
    paginate.current,
    [{ field: 'fluxity', operand: '==', value: selectedCustomerType.value }]
  ))
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
              نرخ ریزش مشتریان
            </span>
            <span style="font-weight: 700; font-size: 32px">
              <!-- {{ overallStatisticsData?.lostCustomerPercentage }} درصد -->
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان از دست رفته
            </span>
            <span style="font-weight: 700; font-size: 32px">
              <!-- {{ overallStatisticsData?.lostCustomer }} -->
              مشتری
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان خواب آلود
            </span>
            <span style="font-weight: 700; font-size: 32px">
              <!-- {{ overallStatisticsData?.lazyCustomer }} مشتری -->
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان معمولی
            </span>
            <span style="font-weight: 700; font-size: 32px">
              <!-- {{ overallStatisticsData?.normalCustomer }} مشتری -->
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

      <div class="mt-10">
        <div style="font-weight: 700; font-size: 20px">لیست مشتریان</div>
        <a-radio-group v-model:value="selectedCustomerType">
          <a-radio-button :value="fluxityType.NORMAL">
            مشتریان معمولی
          </a-radio-button>
          <a-radio-button :value="fluxityType.CHURN">
            مشتریان از دست رفته
          </a-radio-button>
          <a-radio-button :value="fluxityType.LAZY">
            مشتریان خواب آلود
          </a-radio-button>
        </a-radio-group>

        <a-table
          :columns="customerRetentionColumn"
          :data-source="churnRateCustomerData?.items"
          :pagination="churnRateCustomerListPagination"
          class="mt-2"
          @change="onChangePage"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'totalExpenses'">
              {{ record.totalExpenses }} تومان
            </template>
          </template>
        </a-table>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>
