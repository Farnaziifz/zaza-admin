<script lang="ts" setup>
import {
  customerOrder,
  customerOrderList,
} from '../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])

const columns: TableColumnType<customerOrder>[] = [
  {
    title: 'شماره سفارش',
    key: 'trackingCode',
    dataIndex: 'trackingCode',
  },
  {
    title: 'تاریخ ثبت سفارش',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'مبلغ پرداختی',
    key: 'finalPrice',
    dataIndex: 'finalPrice',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  orderData: {
    type: Object,
  },
})
const onChange: TableProps<customerOrderList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>
<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.orderData"
  >
    <a-typography-title :level="4"> لیست سفارش‌ها</a-typography-title>
    <a-table
      :columns="columns"
      v-if="props.orderData.items && props.orderData.items.length"
      :data-source="props.orderData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'finalPrice'">
          {{ $filters.toPersianCurrency(record.finalPrice, 'تومان') }}
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ $filters.toPersianDate(record.createdAt) }}
        </template>
      </template>
    </a-table>
  </a-card>
</template>
