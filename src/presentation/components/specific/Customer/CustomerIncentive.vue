<script lang="ts" setup>
import CustomerScore from '/src/presentation/components/specific/Customer/CustomerIncentive/score.vue'
import CustomerCashBack from '/src/presentation/components/specific/Customer/CustomerIncentive/cachBack.vue'
import CustomerDiscount from '/src/presentation/components/specific/Customer/CustomerIncentive/discount.vue'

import {
  getCustomerScoreList,
  getCustomerCashBack,
  getCustomerIncentiveDiscount,
} from '../../../../logics/specific/customrtList.handler'
import {
  customerScoreList,
  customerCasheBackList,
  customerDiscountList,
} from '../../../../core/types/customer.type'
import { onBeforeMount, ref, Ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { TableProps } from 'ant-design-vue'

const radioValue = ref<string>('score')
const route = useRoute()
const routeId = String(route.params.id)
//api call must to move in parent but for deadline its ignore
const scoreData: Ref<customerScoreList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const discountData: Ref<customerDiscountList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

const cachBackData: Ref<customerCasheBackList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
onBeforeMount(async () => {
  const page = 1
  const pageSize = 6
  scoreData.value = await getCustomerScoreList(routeId, page, pageSize)
})

const getDiscountData = async () => {
  const page = 1
  const pageSize = 10
  discountData.value = await getCustomerIncentiveDiscount(
    routeId,
    page,
    pageSize
  )
}
const getCustomerCachbackData = async () => {
  const page = 1
  const pageSize = 10
  cachBackData.value = await getCustomerCashBack(routeId, page, pageSize)
}
const onChangeTab = () => {
  switch (radioValue.value) {
    case 'discount':
      getDiscountData()
      break
    case 'cashback':
      getCustomerCachbackData()
  }
}

const scorePagination = computed(() => ({
  total: scoreData.value.totalCount,
  current: scoreData.value.page,
  pageSize: 6,
  // showSizeChanger: true,
}))
const discountPagination = computed(() => ({
  total: discountData.value.totalCount,
  current: discountData.value.page,
  pageSize: 6,
  // showSizeChanger: true,
}))
const cachebackPagination = computed(() => ({
  total: cachBackData.value.totalCount,
  current: cachBackData.value.page,
  pageSize: 6,
  // showSizeChanger: true,
}))

const changeScorePaginate: TableProps<customerScoreList>['onChange'] = async (
  paginate
) => {
  scoreData.value = await getCustomerScoreList(
    routeId,
    paginate.current,
    paginate.pageSize
  )
}

const changeCashBackPaginate: TableProps<customerCasheBackList>['onChange'] =
  async (paginate) => {
    cachBackData.value = await getCustomerCashBack(
      routeId,
      paginate.current,
      paginate.pageSize
    )
  }
const changeDiscountPaginate: TableProps<customerScoreList>['onChange'] =
  async (paginate) => {
    discountData.value = await getCustomerIncentiveDiscount(
      routeId,
      paginate.current,
      paginate.pageSize
    )
  }
</script>

<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-card"
  >
    <a-typography-title :level="4"> مشوق ها</a-typography-title>
    <a-radio-group
      v-model:value="radioValue"
      button-style="solid"
      @change="onChangeTab"
    >
      <a-radio-button value="score">امتیازهای دریافتی</a-radio-button>
      <a-radio-button value="price">جایزه</a-radio-button>
      <a-radio-button value="payment">هدیه اعتباری</a-radio-button>
      <a-radio-button value="discount">کد تخفیف</a-radio-button>
      <a-radio-button value="cashback">کش‌بک</a-radio-button>
      <a-radio-button value="coupon">کوپن</a-radio-button>
    </a-radio-group>
    <div class="content-container">
      <div v-if="radioValue === 'score'">
        <CustomerScore
          :pagination="scorePagination"
          :scoreData="scoreData"
          @on-change="changeScorePaginate"
        />
      </div>
      <div v-if="radioValue === 'cashback'">
        <CustomerCashBack
          :cachback-data="cachBackData"
          :pagination="cachebackPagination"
          @on-change="changeCashBackPaginate"
        />
      </div>
      <div v-if="radioValue === 'discount'">
        <CustomerDiscount
          :discount-data="discountData"
          :pagination="discountPagination"
          @on-change="changeDiscountPaginate"
        />
      </div>
      <div v-if="radioValue === 'payment'"><CustomerPayment /></div>
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.content-container {
  margin-top: 24px;
}
</style>
