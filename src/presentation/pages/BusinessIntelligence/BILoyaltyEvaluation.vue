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
import { goToPath } from '@/logics/shared/route.handler'
import { SearchOutlined } from '@ant-design/icons-vue'
import { querySearch, queryType } from '@/logics/shared/queryBuilder'
import _ from 'lodash'

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
    customFilterDropdown: true,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onFilter: (value, record) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      record.name.toString().toLowerCase().includes(value.toLowerCase()),
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
const search = async (selectedKeys: querySearch[]) => {
  const searchQueries = selectedKeys.map((el) => {
    el.keyword = decodeURI(el.keyword)
    return {
      type: queryType.SEARCH,
      data: el,
    }
  })
  const res = await retantionLoyalCustomerList(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    1,
    [
      {
        field: 'CustomerType',
        operand: '==',
        value: selectedCustomerType.value,
      },
    ],
    searchQueries
  )
  if (res) retantionRateData.value = res
}
const reset = async () => {
  const res = await retantionLoyalCustomerList(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    retantionateCustomerListPagination.value.current,
    [
      {
        field: 'CustomerType',
        operand: '==',
        value: selectedCustomerType.value,
      },
    ]
  )
  if (res) retantionRateData.value = res
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const searchInputChange = (e, setSelectedKeys, column) => {
  setSelectedKeys(
    e.target.value
      ? [
          {
            keyword: e.target.value,
            field: _.upperFirst(column.dataIndex),
          },
        ]
      : []
  )
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
          <template
            #customFilterDropdown="{
              setSelectedKeys,
              selectedKeys,
              // confirm,
              // clearFilters,
              column,
            }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`جستجو در نام مشتری`"
                :value="selectedKeys[0]?.keyword"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="searchInputChange($event, setSelectedKeys, column)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px"
                class="ml-2"
                @click="search(selectedKeys)"
              >
                <template #icon>
                  <SearchOutlined />
                </template>
                جستجو
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="
                  () => {
                    reset()
                    setSelectedKeys([])
                  }
                "
              >
                پاک کردن
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
        </a-table>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>
