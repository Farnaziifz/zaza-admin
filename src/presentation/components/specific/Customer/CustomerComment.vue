<script lang="ts" setup async>
import {
  customerComment,
  customerCommentList,
} from '../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerComment>[] = [
  {
    title: 'شماره سفارش',
    key: 'trackingCode',
    dataIndex: 'trackingCode',
  },
  {
    title: 'امتیاز ثبت شده',
    key: 'rate',
    dataIndex: 'rate',
  },
  {
    title: 'متن نظر',
    key: 'comment',
    dataIndex: 'comment',
  },
  {
    title: 'زمان ثبت نظر',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'عملیات',
    key: 'actions',
    dataIndex: 'actions',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  commentData: {
    type: Object,
  },
})
const onChange: TableProps<customerCommentList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>

<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
    v-if="props.commentData"
  >
    <a-typography-title :level="4">نظرات</a-typography-title>
    <a-table
      :columns="columns"
      v-if="props.commentData.items && props.commentData.items.length"
      :data-source="props.commentData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'comment'">
          <div class="comment-container">
            {{ record.comment }}
          </div>
        </template>
        <template v-else-if="column.key === 'actions'">
          <div class="customer-action-container">
            <div class="customer-action-button">
              <a>جزئیات</a>
              <!-- @click="gotoDetails(record.id)" -->
            </div>
          </div>
        </template>
        <template v-if="column.key === 'createdAt'">
          {{ $filters.toPersianDate(record.createdAt) }}
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style lang="scss" scoped>
.comment-container {
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
}
</style>