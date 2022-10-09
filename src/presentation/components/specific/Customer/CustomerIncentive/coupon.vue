<script lang="ts" setup async>
import {
  customerScore,
  customerScoreList,
} from '../../../../../core/types/customer.type'
import { TableColumnType, TableProps } from 'ant-design-vue'

const emitOnChange = defineEmits(['onChange'])
const columns: TableColumnType<customerScore>[] = [
  {
    title: 'عنوان کوپن',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'نوع کوپن ',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'پاداش',
    key: 'reward',
    dataIndex: 'reward',
  },
]
const props = defineProps({
  pagination: {
    type: Object,
  },
  couponData: {
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
    v-if="props.couponData"
  >
    <a-table
      :columns="columns"
      v-if="props.couponData.items && props.couponData.items.length"
      :data-source="props.couponData.items"
      :pagination="props.pagination"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'type'">
          <p class="key">
            <span v-if="record.type === 'BUY_SPECIFIC_PRODUCT'"
              >خرید محصول</span
            >
            <span v-if="record.type === 'BUY_ABOVE_SPECIFIC_PRICE'"
              >خرید بیشتر از یک مبلغ مشخص</span
            >
            <span v-if="record.type === 'FIRST_ORDER'"> اولین خرید</span>
            <span v-if="record.type === 'BUY_FROM_SPECIFIC_CATEGORY'">
              خرید از دسته‌بندی</span
            >
          </p>
          <p class="value">
            <span v-if="record.type === 'BUY_SPECIFIC_PRODUCT'">{{
              record.value.title
            }}</span>
            <span v-if="record.type === 'BUY_ABOVE_SPECIFIC_PRICE'">
              {{
                $filters.toPersianCurrency(record.value.amount / 10, 'تومان')
              }}</span
            >
            <span v-if="record.type === 'BUY_FROM_SPECIFIC_CATEGORY'">
              {{ record.value.title }}</span
            >
          </p>
        </template>
        <template v-if="column.key === 'reward'">
          <p class="key">
            <span v-if="record.reward === 'CREDIT'"> اعتبار</span>
            <span v-if="record.reward === 'FREE_SHIPPING'">ارسال رایگان</span>
            <span v-if="record.reward === 'PRODUCT'">جایزه محصول</span>
            <span v-if="record.reward === 'SCORE'"> امتیاز</span>
            <span v-if="record.reward === 'DISCOUNT'">کد تخفیف</span>
          </p>
          <p class="value">
            <span v-if="record.reward === 'CREDIT'">
              {{
                $filters.toPersianCurrency(record.rewardValue.amount, 'تومان')
              }}</span
            >
            <span v-if="record.reward === 'PRODUCT'">{{
              record.rewardValue.title
            }}</span>
            <span v-if="record.reward === 'SCORE'">
              {{ record.rewardValue.amount }} امتیاز</span
            >
            <span v-if="record.reward === 'DISCOUNT'"
              >{{ record.rewardValue.discountPercentage }} درصد تخفیف تا سقف
              {{
                $filters.toPersianCurrency(
                  record.rewardValue.discountMaximumPrice / 10,
                  'تومان'
                )
              }}</span
            >
          </p>
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
.key {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #363636;
}
.value {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #888888;
}
</style>
