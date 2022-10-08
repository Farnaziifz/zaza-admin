<script lang="ts" async setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { onBeforeMount, ref, reactive, computed } from 'vue'
import {
  transactionHistoryList,
  customerOrderList,
  customerPaymentList,
  customerCommentList,
} from '../../../core/types/customer.type'

import {
  getCustomerProfile,
  chnageCustomerStatus,
  getCustomerWallet,
  getCustomerWalletTransaction,
  getCustomerOrder,
  getCustomerPayment,
  getCustomerComment,
  getCustomerGroup,
} from '../../../logics/specific/customrtList.handler'

import { useRoute } from 'vue-router'
import { TableProps } from 'ant-design-vue'

import CustomerProfile from '/src/presentation/components/specific/Customer/CustomerProfile.vue'
import CustomerWallet from '/src/presentation/components/specific/Customer/CustomerWallet.vue'
import CustomerOrder from '/src/presentation/components/specific/Customer/CustomerOrder.vue'
import CustomerPayment from '/src/presentation/components/specific/Customer/CustomerPayment.vue'
import CustomerComment from '/src/presentation/components/specific/Customer/CustomerComment.vue'
import CustomerMemebershipGroup from '/src/presentation/components/specific/Customer/CustomerMembershipGroup.vue'
import CustomerInsentive from '/src/presentation/components/specific/Customer/CustomerIncentive.vue'
import {
  profileData,
  walletBalanceData,
  transactionWalletData,
  customerGroupData,
  customerCommentData,
  customerPaymentData,
  customerOrderData,
} from '../../../core/constants/customer.options'

const visible = ref<boolean>(false)
const itemForChangeStatus = reactive({ isActive: false, id: '' })
const modalSubmissionButtonLoader = ref(false)
const turnOnLoader = () => (modalSubmissionButtonLoader.value = true)
const turnOffLoader = () => (modalSubmissionButtonLoader.value = false)

const route = useRoute()
const routeId = String(route.params.id)
const activeKey = ref('1')
onBeforeMount(async () => {
  profileData.value = await getCustomerProfile(routeId)
})
const onChangeTab = (tab: string) => {
  switch (tab) {
    case '2':
      getWalletBalanceData()
      getWalletTransaction()
      break
    case '3':
      getCustomerOrderData()
      break
    case '4':
      getCustomerPaymentData()
      break
    case '5':
      console.log('sala,')
      break
    case '6':
      getCustomerCommentData()
      break
    case '7':
      getCustomerGroupData()
  }
}
const getWalletBalanceData = async () => {
  walletBalanceData.value = await getCustomerWallet(routeId)
}
const getWalletTransaction = async () => {
  const page = 1
  const pageSize = 5
  transactionWalletData.value = await getCustomerWalletTransaction(
    routeId,
    page,
    pageSize
  )
}
const getCustomerOrderData = async () => {
  const page = 1
  const pageSize = 5
  customerOrderData.value = await getCustomerOrder(routeId, page, pageSize)
}

const getCustomerPaymentData = async () => {
  const page = 1
  const pageSize = 5
  customerPaymentData.value = await getCustomerPayment(routeId, page, pageSize)
}
const getCustomerCommentData = async () => {
  const page = 1
  const pageSize = 5
  customerCommentData.value = await getCustomerComment(routeId, page, pageSize)
}

const getCustomerGroupData = async () => {
  customerGroupData.value = await getCustomerGroup(routeId)
}
const pagination = computed(() => ({
  total: transactionWalletData.value.totalCount,
  current: transactionWalletData.value.page,
  pageSize: 5,
  // showSizeChanger: true,
}))

const orderPagination = computed(() => ({
  total: customerOrderData.value.totalCount,
  current: customerOrderData.value.page,
  pageSize: 5,
  // showSizeChanger: true,
}))
const paymentPagination = computed(() => ({
  total: customerPaymentData.value.totalCount,
  current: customerPaymentData.value.page,
  pageSize: 5,
  // showSizeChanger: true,
}))

const commentPagination = computed(() => ({
  total: customerCommentData.value.totalCount,
  current: customerCommentData.value.page,
  pageSize: 5,
  // showSizeChanger: true,
}))
const changetransactionPaginate: TableProps<transactionHistoryList>['onChange'] =
  async (paginate) => {
    transactionWalletData.value = await getCustomerWalletTransaction(
      routeId,
      paginate.current,
      paginate.pageSize
    )
  }
const changeOrderPaginate: TableProps<customerOrderList>['onChange'] = async (
  paginate
) => {
  customerOrderData.value = await getCustomerOrder(
    routeId,
    paginate.current,
    paginate.pageSize
  )
}
const changePaymentPaginate: TableProps<customerPaymentList>['onChange'] =
  async (paginate) => {
    customerPaymentData.value = await getCustomerPayment(
      routeId,
      paginate.current,
      paginate.pageSize
    )
  }
const changeCommentPaginate: TableProps<customerCommentList>['onChange'] =
  async (paginate) => {
    customerCommentData.value = await getCustomerComment(
      routeId,
      paginate.current,
      paginate.pageSize
    )
  }
const hideModal = () => {
  visible.value = false
}
const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const changeCustomerStatus = async () => {
  turnOnLoader()
  await chnageCustomerStatus(itemForChangeStatus.id)
  turnOffLoader()
  visible.value = false
  profileData.value = await getCustomerProfile(routeId)
}
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات مشتری</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag v-if="profileData.isActive" color="green">فعال</a-tag>
        <a-tag v-else color="red">غیرفعال</a-tag>
        <a-button
          type="primary"
          size="small"
          @click="showModal(profileData.id, profileData.isActive)"
          >تغییر وضعیت</a-button
        >
      </div>
    </template>
    <template #layout-content>
      <a-tabs v-model:activeKey="activeKey" @change="onChangeTab">
        <a-tab-pane key="1" tab="اطلاعات مشتری">
          <CustomerProfile :profile-data="profileData"
        /></a-tab-pane>
        <a-tab-pane key="2" tab="کیف پول"
          ><CustomerWallet
            :wallet-balance="walletBalanceData"
            :pagination="pagination"
            :transaction-data="transactionWalletData"
            @on-change="changetransactionPaginate"
        /></a-tab-pane>
        <a-tab-pane key="3" tab="سفارش‌ها"
          ><CustomerOrder
            :order-data="customerOrderData"
            :pagination="orderPagination"
            @on-change="changeOrderPaginate"
        /></a-tab-pane>
        <a-tab-pane key="4" tab="پرداخت‌ها">
          <CustomerPayment
            :payment-data="customerPaymentData"
            :pagination="paymentPagination"
            @on-change="changePaymentPaginate"
          />
        </a-tab-pane>
        <a-tab-pane key="5" tab="مشوق‌ها"> <CustomerInsentive /> </a-tab-pane>
        <a-tab-pane key="6" tab="نظرات">
          <CustomerComment
            :comment-data="customerCommentData"
            :pagination="commentPagination"
            @on-change="changeCommentPaginate"
          />
        </a-tab-pane>
        <a-tab-pane key="7" tab="دسته‌بندی های عضو">
          <CustomerMemebershipGroup :group-data="customerGroupData" />
        </a-tab-pane>
      </a-tabs>
    </template>
  </IncentiveDetailLayout>
  <a-modal v-model:visible="visible" title="تغییر وضعیت مشتری">
    <p>
      آیا از تغییر وضعیت مشتری به
      <a-typography-text v-if="!itemForChangeStatus.isActive" type="success"
        >فعال</a-typography-text
      >
      <a-typography-text v-else type="danger">غیرفعال</a-typography-text>
      مطمئن هستید؟
    </p>
    <template #footer>
      <a-button key="back" @click="hideModal">بستن</a-button>
      <a-button
        v-if="!itemForChangeStatus.isActive"
        type="primary"
        @click="changeCustomerStatus"
        >فعال</a-button
      >
      <a-button v-else type="primary" @click="changeCustomerStatus"
        >غیرفعال</a-button
      >
    </template>
  </a-modal>
</template>
