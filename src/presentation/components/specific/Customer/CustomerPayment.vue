<script lang="ts" setup>
import {
  customerPayment,
  customerPaymentList,
} from '../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerPayment>[] = [
  {
    title: 'پرداختی ها',
    key: 'trackingCode',
    dataIndex: 'trackingCode',
  },
  {
    title: 'تاریخ پرداخت',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'وضعیت سفارش',
    key: 'isPaid',
    dataIndex: 'isPaid',
  },
  {
    title: 'مبلغ پرداختی',
    key: 'amount',
    dataIndex: 'amount',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  paymentData: {
    type: Object,
  },
})
const onChange: TableProps<customerPaymentList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>

<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.paymentData"
  >
    <a-typography-title :level="4">لیست پرداخت‌ها</a-typography-title>
    <a-table
      :columns="columns"
      v-if="props.paymentData.items && props.paymentData.items.length"
      :data-source="props.paymentData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'trackingCode'">
          <span v-if="record.type === 'WALLET'"> شارژ کیف پول</span>
          <span v-if="record.type === 'ORDER'"
            >سفارش {{ record.trackingCode }}</span
          >
        </template>
        <template v-if="column.key === 'amount'">
          {{ $filters.toPersianCurrency(record.amount, 'تومان') }}
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ $filters.toPersianDate(record.createdAt) }}
        </template>
        <template v-if="column.key === 'isPaid'">
          <a-tag v-if="record.isPaid" color="green">پرداخت شده</a-tag>
          <a-tag v-else color="red">پرداخت نشده</a-tag>
        </template>
      </template>
    </a-table>
  </a-card>
</template>
