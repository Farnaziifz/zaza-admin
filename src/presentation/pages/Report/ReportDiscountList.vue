<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BChart from '@/presentation/components/shared/Organisms/BChart.vue'
import { chartVariant } from '@/core/enums/chartType.enum'
import _ from 'lodash'
import { onMounted, ref, Ref } from 'vue'
import { promotionUsageReport } from '@/core/types/discounts.type'
import { composePaginationData } from '@/presentation/factory/shared/paginationComputedProp.factory'
import { TablePaginationConfig } from 'ant-design-vue'
import {
  getPromotionReport,
  initHandler,
} from '@/logics/specific/reportDiscountList.handler'
import { reportDiscountUsageColumn } from '@/core/constants/report.options'
import EmptyLayout from '@/presentation/layouts/EmptyLayout.vue'
import { goToPath } from '@/logics/shared/route.handler'
import TargetCustomerListModal from '@/presentation/components/shared/Organisms/TargetCustomerListModal.vue'

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
const serverData: Ref<promotionUsageReport | undefined> = ref(undefined)

const pagination = composePaginationData<promotionUsageReport>(serverData)
const onChangePage = async (paginate: TablePaginationConfig) => {
  const res = await getPromotionReport(paginate.current ?? 1)
  serverData.value = res.data
}

const getGroupTitles = (groupsTitle?: string[]) => {
  if (!_.isEqual(groupsTitle, [])) {
    const res = groupsTitle?.reduce(
      (
        acc: string | undefined,
        cur: string | undefined,
        index: number | undefined
      ) => {
        if (index === 0) return cur
        if (index === 1) return acc + ',' + cur + '...'
      },
      ''
    )
    if (res) return res
  } else {
    return 'فاقد دسته بندی'
  }
}

const targetCustomerListModalVisibility = ref(false)

onMounted(async () => {
  const res = await initHandler()
  if (!_.isEmpty(res.data)) serverData.value = res.data
})
</script>
<template>
  <ContentLayout>
    <template #content-title>
      <span style="font-weight: 700; font-size: 24px"> گزارش کد تخفیف </span>
    </template>

    <template v-if="serverData" #content-body>
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

      <a-table
        class="mt-10"
        :data-source="serverData?.items"
        :columns="reportDiscountUsageColumn"
        :pagination="pagination"
        @change="onChangePage"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'income'">
            {{ record.income }} تومان
          </template>
          <template v-if="column.key === 'cost'">
            {{ record.cost }} تومان
          </template>
          <template v-if="column.key === 'successRate'">
            {{ record.successRate }} درصد
          </template>
          <template v-if="column.key === 'groupsTitle'">
            {{ getGroupTitles(record.groupsTitle) }}
          </template>
          <template v-if="column.key === 'customersCount'">
            <a-button>
              {{ record.customersCount }}
            </a-button>
          </template>
        </template>
      </a-table>
      <!-- InProgress -->
      <!--TODO => add modal of the customers in the application (we already have it)-->
      <target-customer-list-modal
        v-model:visibility="targetCustomerListModalVisibility"
      />
    </template>

    <template v-else #content-body>
      <empty-layout>
        <template #empty-text>
          زمانی گزارش کد تخفیف قابل نمایش است که مشتریان از کد تخفیف‌های ساخته
          شده استفاده کنند. ( خط بعدی) کافی‌ست با توجه به راهبرد تجارت خود یک کد
          تخفیف بسازید و به دسته‌ای از مشتریان تخصیص دهید.
        </template>
        <template #empty-action>
          <a-button
            class="button-secondary"
            type="primary"
            block
            @click="goToPath('/coupons/add')"
          >
            افزودن کد تخفیف
          </a-button>
        </template>
      </empty-layout>
    </template>
  </ContentLayout>
</template>
