<!-- <script lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import { TableColumnType, TableProps } from 'ant-design-vue'

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
</script>

<template>
  <p>salam</p>
</template> -->
