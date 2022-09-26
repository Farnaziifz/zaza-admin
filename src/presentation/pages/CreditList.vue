<script lang="ts" setup async>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import PlusIcon from '/src/presentation/components/shared/atoms/PlusIcon.vue'
import { TableColumnType, TableProps } from 'ant-design-vue'
import {
  credits,
  creditsList,
  creditCustomerGroup,
} from '../../core/types/credits.type'
import { ref, Ref, onBeforeMount, computed, reactive } from 'vue'
import {
  initPageHandler,
  getCustomerGroup,
} from '../../logics/specific/credits.handler'
const columns: TableColumnType<credits>[] = [
  {
    title: 'مشتریان هدف',
    key: 'group',
    dataIndex: 'group',
  },
  {
    title: 'میزان اعتبار',
    key: 'amount',
    dataIndex: 'amount',
  },
  {
    title: 'بازه مصرف اعتبار',
    dataIndex: 'startAt',
    key: 'startAt',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

const customerGroupColumns: TableColumnType<creditCustomerGroup>[] = [
  {
    title: 'نام مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره همراه',
    key: 'mobileNumber',
    dataIndex: 'mobileNumber',
  },
]

const data: Ref<creditsList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const customerData: Ref<creditCustomerGroup> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const visibleGroupModal = ref<boolean>(false)
const activeItemInModal = reactive({ id: '' })

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  data.value = await initPageHandler(page, pageSize)
})
const onChange: TableProps<creditsList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  data.value = await initPageHandler(paginate.current, paginate.pageSize)
}
const onChangeCustomerGroup: TableProps<creditCustomerGroup>['onChange'] =
  async (paginate) => {
    console.log(paginate)
    customerData.value = await getCustomerGroup(
      activeItemInModal.id,
      paginate.current,
      paginate.pageSize
    )
  }
const pagination = computed(() => ({
  total: data.value.totalCount,
  current: data.value.page,
  pageSize: 10,
  // showSizeChanger: true,
}))
const customerpagination = computed(() => ({
  total: customerData.value.totalCount,
  current: customerData.value.page,
  pageSize: 8,
  // showSizeChanger: true,
}))
const openGroupModal = async (item: string) => {
  const page = 1
  const pageSize = 10
  customerData.value = await getCustomerGroup(item, page, pageSize)
  activeItemInModal.id = item
  visibleGroupModal.value = true
}
const handleCancel = () => {
  visibleGroupModal.value = false
}
</script>

<template>
  <content-layout>
    <template #content-title>هدیه اعتباری</template>
    <template #content-actions>
      <a-button type="primary">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن اعتبار</span>
      </a-button>
    </template>
    <template #content-body>
      <div v-if="data.items && data.items.length">
        <a-table
          :columns="columns"
          :pagination="pagination"
          :data-source="data.items"
          @change="onChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'group'">
              <span v-for="gp in record.groups.slice(0, 2)" :key="gp.groupId">
                {{ `${gp.groupTitle} ` }}
                <span v-if="record.groups.length > 1">, </span>
              </span>
              <span>
                <a-typography-text
                  type="danger"
                  class="moreGroup"
                  v-if="record.groups.length > 2"
                  @click="openGroupModal(record.id)"
                  >دیگر...</a-typography-text
                >
              </span>
            </template>
            <template v-if="column.key === 'amount'">
              <span>
                {{ $filters.toPersianCurrency(record.amount, 'تومان') }}
              </span>
            </template>
            <template v-if="column.key === 'startAt'">
              <span>
                {{ $filters.toPersianDate(record.startAt) }}
              </span>
              <span v-if="record.expireAt"> الی </span>
              <span v-if="record.expireAt">
                {{ $filters.toPersianDate(record.expireAt) }}
              </span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="customer-action-container">
                <div
                  class="customer-action-button"
                  @click="goToCouponDetails(record.id)"
                >
                  <a>جزئیات</a>
                </div>
              </div>
            </template>
          </template>
        </a-table>
        <a-modal
          v-model:visible="visibleGroupModal"
          title="مشتریان هدف"
          @ok="handleOk"
        >
          <template #footer>
            <a-button key="back" @click="handleCancel">بستن</a-button>
          </template>
          <a-table
            :columns="customerGroupColumns"
            :pagination="customerpagination"
            :data-source="customerData.items"
            @change="onChangeCustomerGroup"
          >
          </a-table>
        </a-modal>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss" scoped>
.moreGroup {
  color: #1894ff;
  cursor: pointer;
}
</style>
