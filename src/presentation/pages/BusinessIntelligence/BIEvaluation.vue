<script setup lang="ts">
import IncentiveDetailLayout from '@/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import { computed, onMounted, Ref, ref } from 'vue'
import {
  getRetentionCustomerListHandler,
  initHandler,
} from '@/logics/specific/biEvaluation'
import {
  retentionRateCustomerList,
  retentionRateOverallStatistics,
} from '@/core/types/businessIntelligence'
import { TablePaginationConfig } from 'ant-design-vue'

const selectedCustomerType = ref('')
const retentionRateCustomerData: Ref<retentionRateCustomerList | undefined> =
  ref(undefined)

const overallStatisticsData: Ref<retentionRateOverallStatistics | undefined> =
  ref(undefined)

onMounted(async () => {
  const data = await initHandler()
  overallStatisticsData.value = data.overallStatistics.data
  retentionRateCustomerData.value = data.retentionRateCustomer.data
})

const retentionRateCustomersPagination = computed(() => ({
  total: retentionRateCustomerData.value?.totalCount,
  current: retentionRateCustomerData.value?.page,
  pageSize: 10,
}))

const onChangePage = async (paginate: TablePaginationConfig) =>
  (retentionRateCustomerData.value = await getRetentionCustomerListHandler(
    paginate.current
  ))

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
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.attentionNeedCustomerPercentage }} درصد
            </span>
          </div>

          <div style="height: 100px; width: 1px; background-color: #e2e2e2" />

          <div class="flex flex-col items-center">
            <span style="font-weight: 500; font-size: 16px">
              مشتریان از دست رفته
            </span>
            <span style="font-weight: 700; font-size: 32px">
              {{ overallStatisticsData?.attentionNeedCustomerPercentage }}
              درصد
            </span>
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
            :height="300"
            :width="300"
          />
        </div>
      </a-card>

      <div class="mt-10">
        <div style="font-weight: 700; font-size: 20px">لیست مشتریان</div>
        <a-radio-group v-model:value="selectedCustomerType">
          <a-radio-button value="top"> مشتریان عادی</a-radio-button>
          <a-radio-button value="bottom"> مشتریان وفادار</a-radio-button>
          <a-radio-button value="right"> مشتریان امیدوار کننده</a-radio-button>
        </a-radio-group>

        <a-table
          :columns="customerRetentionColumn"
          :data-source="retentionRateCustomerData?.items"
          :pagination="retentionRateCustomersPagination"
          class="mt-2"
          @change="onChangePage"
        >
        </a-table>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>
