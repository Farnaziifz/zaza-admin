<script setup lang="ts">
import IncentiveDetailLayout from '@/presentation/layouts/IncentiveDetailLayout.vue'
import { SettingOutlined, SearchOutlined } from '@ant-design/icons-vue'
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
import { goToPath } from '@/logics/shared/route.handler'
import { querySearch, queryType } from '@/logics/shared/queryBuilder'
import _ from 'lodash'

const selectedCustomerType = ref(fluxityType.NORMAL)
const churnRateCustomerData: Ref<churnRateCustomerList | undefined> =
  ref(undefined)

const overallStatisticsData: Ref<churnRateOverallStatistics | undefined> =
  ref(undefined)

const chnagePathTO = () => {
  goToPath('/business-intelligence')
}

const churnRateCustomerListPagination = computed(() => ({
  total: churnRateCustomerData.value?.totalCount,
  current: churnRateCustomerData.value?.page,
  pageSize: 10,
}))

const customerRetentionColumn = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
    customFilterDropdown: true,
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
const search = async (selectedKeys: querySearch[]) => {
  console.log(selectedKeys)
  const searchQueries = selectedKeys.map((el) => {
    el.keyword = decodeURI(el.keyword)
    return {
      type: queryType.SEARCH,
      data: el,
    }
  })
  const res = await churnCustomerListGETHandler(
    churnRateCustomerListPagination.value.current,
    [{ field: 'fluxity', operand: '==', value: selectedCustomerType.value }],
    searchQueries
  )
  if (res) churnRateCustomerData.value = res
}

const reset = async () => {
  const res = await churnCustomerListGETHandler(1, [
    { field: 'fluxity', operand: '==', value: selectedCustomerType.value },
  ])
  if (res) churnRateCustomerData.value = res
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
    <template #layout-title> ارزیابی از دست رفتن مشتریان</template>
    <template #layout-actions>
      <a-button
        type="primary"
        class="button-secondary items-center"
        size="large"
        @click="chnagePathTO"
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

          <template
            #customFilterDropdown="{ setSelectedKeys, selectedKeys, column }"
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
