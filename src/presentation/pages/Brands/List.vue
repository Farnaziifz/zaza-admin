<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { onBeforeMount, Ref, ref, computed } from 'vue'
import { TableProps, TableColumnType } from 'ant-design-vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import router from '@/resources/router'
import { brandItem, brandList } from '@/core/types/brand.type'
import { initPageHandler } from '@/logics/specific/brands.handler'

const serverData: Ref<brandList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const columns: TableColumnType<brandItem>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره سفارش',
    key: 'trackingCode',
    dataIndex: 'trackingCode',
  },
  {
    title: 'امتیاز ثبت شده',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'متن نظر',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  serverData.value = await initPageHandler(page, pageSize)
})
</script>

<template>
  <content-layout></content-layout>
</template>

<style lang="scss"></style>
