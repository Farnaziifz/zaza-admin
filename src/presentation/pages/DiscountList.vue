<script lang="ts" setup async>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { TableColumnType } from 'ant-design-vue'
import { discounts } from '@/core/types/discounts.type'

const columns: TableColumnType<discounts>[] = [
  {
    title: 'عنوان تخفیف',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'تنظیمات تخفیف',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'مقدار تخفیف',
    dataIndex: 'reward',
    key: 'reward',
  },
  {
    title: 'مشتریان هدف',
    dataIndex: 'isActive',
    key: 'isActive',
  },
  {
    title: 'وضعیت تخفیف',
    dataIndex: 'isActive',
    key: 'isActive',
  },
  {
    title: 'زمان شروع و پایان',
    dataIndex: 'isActive',
    key: 'isActive',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]
</script>
<template>
  <content-layout>
    <template #content-title>کد تخفیف</template>
    <template #content-actions>
      <a-button type="primary">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن کد تخفیف</span>
      </a-button>
    </template>
    <!--   :pagination="pagination"
        :data-source="data.items"
        @change="onChange" -->
    <template #content-body>
      <a-table :columns="columns"> </a-table>
    </template>
  </content-layout>
</template>
