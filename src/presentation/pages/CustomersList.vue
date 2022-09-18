<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { TableColumnType, TableProps } from 'ant-design-vue'
import { customer, customerList } from '../../core/types/customer.type'
import { error } from '../../core/types/error.type'
import { initPageHandler } from '../../logics/specific/customrtList.handler'
import { onBeforeMount, Ref, ref } from 'vue'

const columns: TableColumnType<customer>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'تاریخ عضویت',
    key: 'createdAt',
    dataIndex: 'createdAt',
    sorter: (a: customer, b: customer) => a.createdAt - b.createdAt,
  },
  {
    title: 'میانگین پرداختی',
    dataIndex: 'totalExpenses',
    key: 'totalExpenses',
    sorter: (a: customer, b: customer) => a.totalExpenses - b.totalExpenses,
  },
  {
    title: 'تعداد سفارش',
    dataIndex: 'numberOfOrder',
    key: 'numberOfOrder',
    sorter: (a: customer, b: customer) => a.numberOfOrder - b.numberOfOrder,
  },
  {
    title: 'ارزش مشتری',
    dataIndex: 'value',
    key: 'value',
    sorter: (a: customer, b: customer) => a.value - b.value,
  },
  {
    title: 'برچسب مشتری',
    dataIndex: 'clientTags',
    key: 'clientTags',
  },
  {
    title: 'وضعیت',
    dataIndex: 'isActive',
    key: 'isActive',
    filters: [
      { text: 'فعال', value: true },
      { text: 'غیر فعال', value: false },
    ],
    onFilter: (value: boolean, record: customer) => (record.isActive = value),
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

const data: Ref<customerList | error> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

onBeforeMount(async () => {
  data.value = await initPageHandler()
})
const onChange: TableProps<customerList>['onChange'] = (pagination, sorter) => {
  console.log('params', pagination, sorter)
}
</script>

<template>
  <content-layout>
    <template #content-title>لیست مشتریان</template>
    <template #content-body>
      <a-table :columns="columns" :data-source="data.items" @change="onChange">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'totalExpenses'">
            {{ $filters.toPersianCurrency(record.totalExpenses, 'تومان') }}
          </template>
          <template v-if="column.key === 'createdAt'">
            {{ $filters.toPersianDate(record.createdAt) }}
          </template>
          <template v-if="column.key === 'value'">
            {{ $filters.toPersianCurrency(record.value, 'تومان') }}
          </template>
          <template v-if="column.key === 'clientTags'">
            <span>
              <a-tag color="green" v-if="record.orderLabel === 'HAPPY'">
                خوشحال</a-tag
              >
              <a-tag color="red" v-if="record.orderLabel === 'UN_HAPPY'">
                ناراضی</a-tag
              >
              <a-tag color="default" v-if="record.orderLabel === 'NEUTRAL'">
                خنثی</a-tag
              >
            </span>
            <span>
              <a-tag color="warning" v-if="record.degreeLabel === 'GOLD'">
                طلایی</a-tag
              >
              <a-tag color="default" v-if="record.degreeLabel === 'SILVER'">
                نقره‌ای</a-tag
              >
              <a-tag color="#E6BF98" v-if="record.degreeLabel === 'BRONZE'">
                برنزه‌ای</a-tag
              >
            </span>
          </template>
          <template v-if="column.key === 'isActive'">
            <span>
              <a-tag color="green" v-if="record.isActive"> فعال</a-tag>
              <a-tag color="red" v-else> غیرقعال</a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'actions'">
            <a>تغییر وضعیت</a>
            <a-divider type="vertical" />
            <a>جزئیات</a>
          </template>
        </template>
      </a-table>
    </template>
  </content-layout>
</template>
