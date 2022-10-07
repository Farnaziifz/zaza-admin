<script lang="ts" setup async>
import {
  customerScore,
  customerScoreList,
} from '../../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerScore>[] = [
  {
    title: 'نحوه دریافت',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'مقدار ',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'تاریخ دریافت امتیاز',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'میزان امتیاز',
    key: 'unit',
    dataIndex: 'unit',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  scoreData: {
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
    v-if="props.scoreData"
  >
    <a-table
      :columns="columns"
      v-if="props.scoreData.items && props.scoreData.items.length"
      :data-source="props.scoreData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <div class="type-container">
            <span v-if="record.type === 'ORDER'"> هر سفارش</span>
            <span v-else>به ازای یک مبلغ مشخص</span>
          </div>
        </template>
        <template v-if="column.key === 'amount'">
          {{ $filters.toPersianCurrency(record.unit, 'تومان') }}
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ $filters.toPersianDate(record.createdAt) }}
        </template>
        <template v-if="column.key === 'unit'">
          {{ record.amount }} امتیاز
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style lang="scss" scoped>
.type-container {
  width: 100%;
  text-align: right;
}
</style>
