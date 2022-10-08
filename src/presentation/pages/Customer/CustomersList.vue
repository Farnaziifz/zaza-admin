<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import BadgeComponent from '/src/presentation/components/shared/Organisms/Badge.vue'
import { TableProps } from 'ant-design-vue'
import { customerList } from '../../../core/types/customer.type'
import {
  initPageHandler,
  chnageCustomerStatus,
} from '../../../logics/specific/customrtList.handler'
import { onBeforeMount, ref, reactive, computed } from 'vue'
import router from '@/resources/router'
import { columns, data } from '../../../core/constants/customer.options'

const itemForChangeStatus = reactive({ isActive: false, id: '' })
const modalSubmissionButtonLoader = ref(false)
const turnOnLoader = () => (modalSubmissionButtonLoader.value = true)
const turnOffLoader = () => (modalSubmissionButtonLoader.value = false)

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  data.value = await initPageHandler(page, pageSize)
})
const pagination = computed(() => ({
  total: data.value.totalCount,
  current: data.value.page,
  pageSize: 10,
  showSizeChanger: true,
}))
const onChange: TableProps<customerList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  data.value = await initPageHandler(paginate.current, paginate.pageSize)
}
const visible = ref<boolean>(false)
const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const hideModal = () => {
  visible.value = false
}
const changeCustomerStatus = async () => {
  turnOnLoader()
  await chnageCustomerStatus(itemForChangeStatus.id)
  turnOffLoader()
  visible.value = false
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
}
const goToDetails = (item: string) => {
  router.push({ name: 'customer-details', params: { id: item } })
}
</script>

<template>
  <content-layout>
    <template #content-title>لیست مشتریان</template>
    <template #content-body>
      <div v-if="data.items && data.items.length" class="table-container">
        <a-table
          :columns="columns"
          :data-source="data.items"
          :pagination="pagination"
          @change="onChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'totalExpenses'">
              {{ $filters.toPersianCurrency(record.totalExpenses, 'تومان') }}
            </template>
            <template v-if="column.key === 'createdAt'">
              {{ $filters.toPersianDate(record.createdAt) }}
            </template>
            <template v-if="column.key === 'value'">
              {{ $filters.toPersianCurrency(record.value, 'تومان') }}
            </template>
            <template v-if="column.key === 'clientTags'">
              <span>
                <a-tag v-if="record.orderLabel === 'HAPPY'" color="green">
                  راضی</a-tag
                >
                <a-tag v-if="record.orderLabel === 'UN_HAPPY'" color="red">
                  ناراضی</a-tag
                >
                <a-tag v-if="record.orderLabel === 'NEUTRAL'" color="default">
                  خنثی</a-tag
                >
              </span>
              <span>
                <a-tag v-if="record.degreeLabel === 'GOLD'" color="warning">
                  طلایی</a-tag
                >
                <a-tag v-if="record.degreeLabel === 'SILVER'" color="default">
                  نقره‌ای</a-tag
                >

                <BadgeComponent
                  v-if="record.degreeLabel === 'BRONZE'"
                  color="#E6BF98"
                  background="#F5E5D6"
                  >برنزی</BadgeComponent
                >
              </span>
            </template>
            <template v-if="column.key === 'isActive'">
              <span>
                <a-tag v-if="record.isActive" color="green"> فعال</a-tag>
                <a-tag v-else color="red"> غیرفعال</a-tag>
              </span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="customer-action-container">
                <div class="customer-action-button">
                  <a @click="showModal(record.id, record.isActive)"
                    >تغییر وضعیت</a
                  >
                </div>
                <div class="customer-action-button">
                  <a @click="goToDetails(record.id)">جزئیات</a>
                </div>
              </div>
            </template>
          </template>
        </a-table>
        <a-modal v-model:visible="visible" title="تغییر وضعیت مشتری">
          <p>
            آیا از تغییر وضعیت مشتری به
            <a-typography-text
              v-if="!itemForChangeStatus.isActive"
              type="success"
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
      </div>
      <EmptyLayout v-else>
        <template #empty-text>
          متاسفانه هنوز اطلاعات مشتریان خود را ثبت نکرده اید. در این قسمت شما
          لیست مشتریان شامل تاریخ عضویت، تعداد سفارش، مجموع پرداختی‌ها، برچسب‌ها
          و وضعیت مشتری را مشاهده خواهید کرد.
        </template>
        <template #empty-action>
          <a-button type="primary" block>افزودن مشتری</a-button>
        </template>
      </EmptyLayout>
    </template>
  </content-layout>
</template>

<style lang="scss">
.ant-table-column-sorters {
  justify-content: center !important;
  span {
    margin: 0 !important;
  }
}
.ant-table-cell {
  text-align: center !important;
}
.customer-action-container {
  display: flex;
  justify-content: center;
  .customer-action-button {
    margin: 0 16px;
    cursor: pointer;
    a {
      color: #1894ff;
    }
  }
}
</style>
