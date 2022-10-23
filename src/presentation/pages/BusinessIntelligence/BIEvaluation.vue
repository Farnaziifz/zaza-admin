<script setup lang="ts">
import IncentiveDetailLayout from '@/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import {
  churnCustomerListGETHandler,
  initHandler,
} from '@/logics/specific/biEvaluation'
import {
  churnRateCustomerList,
  churnRateOverallStatistics,
} from '@/core/types/businessIntelligence'
import { TablePaginationConfig } from 'ant-design-vue'
import { fluxityType } from '@/core/enums/fluxityType.enum'

const selectedCustomerType = ref(fluxityType.NORMAL)
const churnRateCustomerData: Ref<churnRateCustomerList | undefined> =
  ref(undefined)

const overallStatisticsData: Ref<churnRateOverallStatistics | undefined> =
  ref(undefined)

const churnRateCustomerListPagination = computed(() => ({
  total: churnRateCustomerData.value?.totalCount,
  current: churnRateCustomerData.value?.page,
  pageSize: 10,
}))

const customerRetentionColumn = [
  {
    title: 'نام مشتری',
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
const dataCh = ref({
  labels: ['مشتریان معمولی', 'مشتریان از دست رفته', 'مشتریان خواب آلود'],
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

const onChangePage = async (paginate: TablePaginationConfig) =>
  (churnRateCustomerData.value = await churnCustomerListGETHandler(
    paginate.current,
    [{ field: 'fluxity', operand: '==', value: selectedCustomerType.value }]
  ))

onMounted(async () => {
  const data = await initHandler([
    { field: 'fluxity', operand: '==', value: selectedCustomerType.value },
  ])
  overallStatisticsData.value = data.overallStatistics?.data
  churnRateCustomerData.value = data.churnRateCustomerList?.data

  dataCh.value.datasets = [
    {
      label: 'My First Dataset',
      data: [
        overallStatisticsData.value?.normalCustomerPercentage ?? 0,
        overallStatisticsData.value?.lostCustomerPercentage ?? 0,
        overallStatisticsData.value?.lazyCustomerPercentage ?? 0,
      ],
      backgroundColor: ['#F765A3', '#A155B9', '#16BFD6'],
      hoverOffset: 4,
    },
  ]
})

watch(
  selectedCustomerType,
  async () => {
    churnRateCustomerData.value = await churnCustomerListGETHandler(1, [
      { field: 'fluxity', operand: '==', value: selectedCustomerType.value },
    ])
  },
  { deep: true }
)
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
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.lostCustomerPercentage }} درصد
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان از دست رفته
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.lostCustomer }}
              مشتری
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان خواب آلود
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.lazyCustomer }} مشتری
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان معمولی
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.normalCustomer }} مشتری
            </span>
          </div>
        </div>

        <div class="flex justify-center">
          <BChart
            :chart-type="chartVariant.Pie"
            :chart-data="dataCh"
            :chart-options="options"
            :height="300"
            :width="300"
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
        </a-table>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>
