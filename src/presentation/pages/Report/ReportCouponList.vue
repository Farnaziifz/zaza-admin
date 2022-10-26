<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { ref } from 'vue'

const couponListColumn = [
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

const serverData = ref()
// const pagination =
</script>

<template>
  <content-layout>
    <template #content-title> گزارش کوپن‌ها</template>
    <template #content-body>
      <a-table :columns="couponListColumn" :data-source="serverData">
        <!--          :pagination="churnRateCustomerListPagination"-->
        <!--          class="mt-2"-->
        <!--          @change="onChangePage"-->
        <!--        <template #bodyCell="{ column, record }">-->
        <!--          <template v-if="column.key === 'totalExpenses'">-->
        <!--            {{ record.totalExpenses }} تومان-->
        <!--          </template>-->
        <!--        </template>-->
      </a-table>
    </template>
  </content-layout>
</template>
