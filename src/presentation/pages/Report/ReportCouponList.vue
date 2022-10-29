<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { onMounted, ref } from 'vue'
import {
  getCoupons,
  initHandler,
} from '@/logics/specific/reportCouponList.handler'
import { t } from 'vui18n'
import { composePaginationData } from '@/presentation/factory/shared/paginationComputedProp.factory'

const couponListColumn = [
  {
    title: 'عنوان کوپن',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'نوع کوپن',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'پاداش',
    key: 'reward',
    dataIndex: 'reward',
  },
  {
    title: 'تعداد مشتریان دریافت کننده کوپن',
    key: 'visit',
    dataIndex: 'visit',
  },
  {
    title: 'تعداد  مشتریان مصرف کرده',
    key: 'numberOfUsed',
    dataIndex: 'numberOfUsed',
  },
  {
    title: 'نرخ انتخاب',
    key: 'selectionRate',
    dataIndex: 'selectionRate',
  },
]

const serverData = ref()
onMounted(async () => {
  const res = await initHandler()
  serverData.value = res.data
})
const pagination = composePaginationData(serverData)
const onChangePagination = async (paginationData: { current: number }) => {
  const res = await getCoupons(paginationData.current)
  serverData.value = res.data
}
</script>

<template>
  <content-layout>
    <template #content-title> گزارش کوپن‌ها</template>
    <template #content-body>
      <a-table
        :columns="couponListColumn"
        :data-source="serverData?.items"
        :pagination="pagination"
        @change="onChangePagination"
      >
        <template #bodyCell="{ column, record }">
          <span v-if="column.key === 'type'">
            {{ t(`types.couponTypeEnum.${record.type}`) }}
          </span>
          <span v-if="column.key === 'reward'">
            {{ t(`types.couponRewardEnum.${record.reward}`) }}
          </span>
          <span v-if="column.key === 'visit'">
            {{ `${record.visit} مشتری` }}
          </span>
          <span v-if="column.key === 'numberOfUsed'">
            {{ `${record.numberOfUsed} مشتری` }}
          </span>
          <span v-if="column.key === 'selectionRate'">
            {{ `${record.selectionRate} درصد` }}
          </span>
        </template>
      </a-table>
    </template>
  </content-layout>
</template>
