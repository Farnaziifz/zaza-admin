<script lang="ts" setup>
import { TableColumnType, TableProps } from 'ant-design-vue'
import {
  transactionHistory,
  transactionHistoryList,
} from '../../../../core/types/customer.type'

const emitOnChange = defineEmits(['onChange'])

const props = defineProps({
  walletBalance: {
    type: Object,
  },
  pagination: {
    type: Object,
  },
  transactionData: {
    type: Object,
  },
})

const columns: TableColumnType<transactionHistory>[] = [
  {
    title: 'نحوه شارژ کیف پول',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'مقدار',
    key: 'amount',
    dataIndex: 'amount',
  },
]
const onChange: TableProps<transactionHistoryList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>
<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.walletBalance"
  >
    <a-typography-title :level="4"> کیف پول</a-typography-title>
    <p class="key" v-if="props.walletBalance.amount !== null">موجودی</p>
    <p class="value" v-if="props.walletBalance.amount !== null">
      {{ $filters.toPersianCurrency(props.walletBalance.amount, 'تومان') }}
    </p>
  </a-card>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.transactionData"
  >
    <a-table
      :columns="columns"
      v-if="props.transactionData.items && props.transactionData.items.length"
      :data-source="props.transactionData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'amount'">
          {{ $filters.toPersianCurrency(record.amount, 'تومان') }}
        </template>
        <template v-if="column.key === 'type'">
          <span v-if="record.type === 'ADMIN'">هدیه اعتباری</span>
          <span v-if="record.type === 'CASHBACK'">کش بک</span>
          <span v-if="record.type === 'COUPON'">کوپن</span>
          <span v-if="record.type === 'CUSTOMER'">توسط کاربر</span>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style lang="scss" scoped>
.info-card {
  margin-bottom: 16px;
}
.key {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #6d6d6d;
  margin-top: 24px;
}
.value {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  margin-bottom: 4px;
}
</style>