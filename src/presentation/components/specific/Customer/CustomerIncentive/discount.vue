<script lang="ts" setup async>
import {
  customerDiscount,
  customerDiscountList,
} from '../../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerDiscount>[] = [
  {
    title: 'عنوان تخفیف و کد تخفیف',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'تنظیمات کد تخفیف ',
    key: 'codeSetting',
    dataIndex: 'codeSetting',
  },
  {
    title: 'وضعیت تخفیف',
    key: 'codeState',
    dataIndex: 'codeState',
  },
  {
    title: 'مدت مصرف',
    key: 'codeDate',
    dataIndex: 'codeDate',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
    default() {
      return {}
    },
  },
  discountData: {
    type: Object,
    default() {
      return {}
    },
  },
})

const onChange: TableProps<customerDiscountList>['onChange'] = (paginate) => {
  emitOnChange('onChange', paginate)
}
</script>
<template>
  <a-card
    v-if="props.discountData"
    :body-style="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
  >
    <a-table
      v-if="props.discountData.items && props.discountData.items.length"
      :columns="columns"
      :data-source="props.discountData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'title'">
          {{ record.title }} - {{ record.code }}
        </template>
        <template v-if="column.key === 'codeSetting'">
          <div class="code-setting-container">
            <a-tag v-if="record.consumeType === 'SEVERAL_TIMES'" color="blue">
              چندبار مصرف</a-tag
            >
            <a-tag v-if="record.consumeType === 'ONCE'" color="blue"
              >یکبار مصرف</a-tag
            >
            <a-tag v-if="record.stateType === 'CONSTANT'" color="blue">
              ثابت</a-tag
            >
            <a-tag v-if="record.stateType === 'VARIABLE'" color="blue"
              >متغیر</a-tag
            >
            <a-tag v-if="record.type === 'CASH'" color="blue">تومانی</a-tag>
            <a-tag v-if="record.type === 'PERCENTAGE'" color="blue"
              >درصدی</a-tag
            >
          </div>
        </template>
        <template v-if="column.key === 'codeDate'">
          {{ $filters.toPersianDate(record.startAt) }}
          <span class="colored">الی</span>
          {{ $filters.toPersianDate(record.expireAt) }}
        </template>
        <template v-if="column.key === 'codeState'">
          <a-tag v-if="record.status === 'UNUSED'" color="green"
            >استفاده شده</a-tag
          >
          <a-tag v-if="record.status === 'USED'" color="red"
            >استفاده نشده</a-tag
          >
          <a-tag v-if="record.status === 'MULTIPLE_USED'" color="orange"
            >{{ record.consumedCount }} بار استفاده شده</a-tag
          >
        </template>
      </template>
    </a-table>
  </a-card>
</template>

<style lang="scss" scoped>
.code-setting-container {
  width: 100%;
  display: flex;
}
.ant-tag {
  width: 100%;
  text-align: center;
}
.colored {
  color: #1894ff;
  margin: 0 4px;
}
</style>
