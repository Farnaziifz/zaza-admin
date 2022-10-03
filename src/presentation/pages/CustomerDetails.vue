<script lang="ts" async setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { onBeforeMount, Ref, ref, reactive } from 'vue'
import { customer } from '../../core/types/customer.type'
import {
  getCustomerProfile,
  chnageCustomerStatus,
} from '../../logics/specific/customrtList.handler'
import { useRoute } from 'vue-router'
import CustomerProfile from '/src/presentation/components/specific/Customer/CustomerProfile.vue'

const profileData: Ref<customer> = ref({
  id: '',
  fullName: '',
  createdAt: 0,
  numberOfOrder: 0,
  totalExpenses: 0,
  value: 0,
  orderLabel: '',
  DegreeLabel: '',
  isActive: false,
})
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
  console.log(tab)
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
          <CustomerProfile :profileData="profileData"
        /></a-tab-pane>
        <a-tab-pane key="2" tab="کیف پول">کیف پول</a-tab-pane>
        <a-tab-pane key="3" tab="سفارش‌ها">سفارش‌ها</a-tab-pane>
        <a-tab-pane key="4" tab="پرداخت‌ها">پرداخت‌ها</a-tab-pane>
        <a-tab-pane key="5" tab="مشوق‌ها">مشوق‌ها</a-tab-pane>
        <a-tab-pane key="6" tab="نظرات">نظرات</a-tab-pane>
        <a-tab-pane key="7" tab="سفارش‌ها">سفارش‌ها</a-tab-pane>
        <a-tab-pane key="8" tab="دسته‌بندی های عضو"
          >دسته‌بندی های عضو</a-tab-pane
        >
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
