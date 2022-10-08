<script lang="ts" setup async>
import {
  customerScore,
  customerScoreList,
} from '../../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerScore>[] = [
  {
    title: 'ارزش  سفارش',
    key: 'orderFinalPrice',
    dataIndex: 'orderFinalPrice',
  },
  {
    title: 'نوع کش‌بک ',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'مقدار کش‌بک',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'مدت',
    key: 'hasTime',
    dataIndex: 'hasTime',
  },
  {
    title: 'مدت مصرف',
    key: 'date',
    dataIndex: 'date',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  cachbackData: {
    type: Object,
  },
})

const onChange: TableProps<customerScoreList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>

<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.cachbackData"
  >
    <a-table
      :columns="columns"
      v-if="props.cachbackData.items && props.cachbackData.items.length"
      :data-source="props.cachbackData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'orderFinalPrice'">
          {{ $filters.toPersianCurrency(record.orderFinalPrice, 'تومان') }}
        </template>
        <template v-if="column.key === 'type'">
          <span v-if="record.type === 'PRICE'">تومانی</span>
          <span v-else>درصدی</span>
        </template>
        <template v-if="column.key === 'amount'">
          <span v-if="record.type === 'PRICE'">
            {{ $filters.toPersianCurrency(record.amount, 'تومان') }}
          </span>
          <span v-else>
            {{ record.amount }} درصد تا سقف
            {{ $filters.toPersianCurrency(record.maximumPrice, 'تومان') }}
          </span>
        </template>
        <template v-if="column.key === 'date'">
          <p v-if="record.expireAt">
            <span v-if="record.startAt">
              {{ $filters.toPersianDate(record.startAt) }}
            </span>
            <span class="colored">الی</span>
            <span v-if="record.expireAt">
              {{ $filters.toPersianDate(record.expireAt) }}</span
            >
          </p>
          <p v-else>-</p>
        </template>
        <template v-if="column.key === 'hasTime'">
          <span v-if="record.expireAt !== null"> دارد </span>
          <span v-else>ندارد</span>
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style lang="scss" scoped>
.colored {
  color: #1894ff;
  margin: 0 4px;
}
</style>
