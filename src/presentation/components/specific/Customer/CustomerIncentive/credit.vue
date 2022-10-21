<script lang="ts" setup async>
import {
  customerScore,
  customerScoreList,
} from '../../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerScore>[] = [
  {
    title: 'مبلغ اعتبار',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'زمان ثبت اعتبار ',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'مدت',
    key: 'hasPeriod',
    dataIndex: 'hasPeriod',
  },
  {
    title: 'مدت مصرف',
    key: 'hasTime',
    dataIndex: 'hasTime',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
    default() {
      return {}
    },
  },
  creditData: {
    type: Object,
    default() {
      return {}
    },
  },
})

const onChange: TableProps<customerScoreList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>

<template>
  <a-card
    v-if="props.creditData"
    :body-style="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
  >
    <a-table
      v-if="props.creditData.items && props.creditData.items.length"
      :columns="columns"
      :data-source="props.creditData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'amount'">
          {{ $filters.toPersianCurrency(record.amount / 10, 'تومان') }}
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ $filters.toPersianDate(record.createdAt) }}
        </template>
        <template v-if="column.key === 'hasPeriod'">
          <span v-if="record.hasPeriod"> دارد </span>
          <span v-else>ندارد</span>
        </template>
        <template v-if="column.key === 'hasTime'">
          <span v-if="record.expireAt">
            {{ $filters.toPersianDate(record.startAt) }}
            <span class="colored">الی</span>
            {{ $filters.toPersianDate(record.expireAt) }}
          </span>
          <span v-else>-</span>
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
