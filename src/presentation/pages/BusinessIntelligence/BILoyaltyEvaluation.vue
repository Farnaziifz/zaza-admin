<script setup lang="ts">
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined } from '@ant-design/icons-vue'
import { retentionLoyalityRateOverallStatistics } from '../../../core/types/businessIntelligence'
import { ref, Ref, onMounted, watch, computed } from 'vue'
import {
  initHandler,
  retantionLoyalCustomerList,
} from '../../../logics/specific/retationLoyality.handler'
import { chartVariant } from '@/core/enums/chartType.enum'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { TablePaginationConfig } from 'ant-design-vue'
import { loyalityType } from '../../../core/enums/fluxityType.enum'
import { retantionRateCustomerList } from '@/core/types/retantionRate.type'
import _ from 'lodash'
import { goToPath } from '@/logics/shared/route.handler'

const overallStatisticsData: Ref<
  retentionLoyalityRateOverallStatistics | undefined
> = ref(undefined)
const selectedCustomerType = ref(loyalityType.HERO)
const dataCh = ref({
  labels: ['مشتریان قهرمان', 'مشتریان وفادار', 'نیازمند توجه'],
  datasets: [{}],
})
const retantionRateData: Ref<retantionRateCustomerList | undefined> =
  ref(undefined)

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
      label: 'evaluation loyality chart',
      data: [
        overallStatisticsData.value?.heroCustomerPercentage ?? 0,
        overallStatisticsData.value?.loyalCustomerPercentage ?? 0,
        overallStatisticsData.value?.attentionNeedCustomerPercentage ?? 0,
      ],
      backgroundColor: ['#A155B9', '#16BFD6', '#F765A3'],
      hoverOffset: 4,
    },
  ]
  const customerData = await retantionLoyalCustomerList(1, [
    { field: 'CustomerType', operand: '==', value: loyalityType.HERO },
  ])
  retantionRateData.value = customerData
})

watch(
  selectedCustomerType,
  async () => {
    retantionRateData.value = await retantionLoyalCustomerList(1, [
      {
        field: 'CustomerType',
        operand: '==',
        value: selectedCustomerType.value,
      },
    ])
  },
  { deep: true }
)
const retantionateCustomerListPagination = computed(() => ({
  total: retantionRateData.value?.totalCount,
  current: retantionRateData.value?.page,
  pageSize: 10,
}))
const onChangePage = async (paginate: TablePaginationConfig) =>
  (retantionRateData.value = await retantionLoyalCustomerList(
    _.toNumber(paginate.current),
    [
      {
        field: 'CustomerType',
        operand: '==',
        value: selectedCustomerType.value,
      },
    ]
  ))
const goToSetting = () => {
  goToPath('/business-intelligence/retantion-rate-setting')
}
</script>

<template>
  <IncentiveDetailLayout :has-return-button="false">
    <template #layout-title>ارزیابی وفاداری مشتریان</template>
    <template #layout-actions>
      <a-button
        type="primary"
        class="button-secondary items-center"
        size="large"
        @click="goToSetting"
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
              مشتریان نیازمند توجه
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
      <div class="mt-10">
        <div style="font-weight: 700; font-size: 20px">لیست مشتریان</div>
        <a-radio-group v-model:value="selectedCustomerType" class="mt-4">
          <a-radio-button :value="loyalityType.HERO">
            مشتریان قهرمان
          </a-radio-button>
          <a-radio-button :value="loyalityType.LOYAL">
            مشتریان وفادار
          </a-radio-button>
          <a-radio-button :value="loyalityType.ATTENTION_NEED">
            نیازمند توجه
          </a-radio-button>
        </a-radio-group>
        <a-table
          :columns="customerRetentionColumn"
          class="mt-2"
          :data-source="retantionRateData?.items"
          :pagination="retantionateCustomerListPagination"
          @change="onChangePage"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'totalExpenses'">
              {{
                $filters.toPersianCurrency(record.totalExpenses / 10, 'تومان')
              }}
            </template>
          </template>
        </a-table>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>
