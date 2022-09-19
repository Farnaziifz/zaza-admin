<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import BadgeComponent from '/src/presentation/components/shared/Organisms/Badge.vue'
import { TableColumnType, TableProps } from 'ant-design-vue'
import { customer, customerList } from '../../core/types/customer.type'
import {
  initPageHandler,
  chnageCustomerStatus,
} from '../../logics/specific/customrtList.handler'
import { onBeforeMount, Ref, ref, reactive, computed } from 'vue'

const columns: TableColumnType<customer>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'تاریخ عضویت',
    key: 'createdAt',
    dataIndex: 'createdAt',
    sorter: (a: customer, b: customer) => a.createdAt - b.createdAt,
  },
  {
    title: 'میانگین پرداختی',
    dataIndex: 'totalExpenses',
    key: 'totalExpenses',
    sorter: (a: customer, b: customer) => a.totalExpenses - b.totalExpenses,
  },
  {
    title: 'تعداد سفارش',
    dataIndex: 'numberOfOrder',
    key: 'numberOfOrder',
    sorter: (a: customer, b: customer) => a.numberOfOrder - b.numberOfOrder,
  },
  {
    title: 'ارزش مشتری',
    dataIndex: 'value',
    key: 'value',
    sorter: (a: customer, b: customer) => a.value - b.value,
  },
  {
    title: 'برچسب مشتری',
    dataIndex: 'clientTags',
    key: 'clientTags',
  },
  {
    title: 'وضعیت',
    dataIndex: 'isActive',
    key: 'isActive',
    filters: [
      { text: 'فعال', value: true },
      { text: 'غیر فعال', value: false },
    ],
    onFilter: (value: boolean, record: customer) => (record.isActive = value),
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]
const itemForChangeStatus = reactive({ isActive: false, id: '' })

const data: Ref<customerList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  data.value = await initPageHandler(page, pageSize)
})
const pagination = computed(() => ({
  total: data.value.totalCount,
  current: data.value.page,
  pageSize: 10,
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
  await chnageCustomerStatus(itemForChangeStatus.id)
  visible.value = false
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
}
</script>

<template>
  <content-layout>
    <template #content-title>لیست مشتریان</template>
    <template #content-body>
      <div class="table-container" v-if="data.items && data.items.length">
        <a-table
          :columns="columns"
          :data-source="data.items"
          @change="onChange"
          :pagination="pagination"
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
                <a-tag color="green" v-if="record.orderLabel === 'HAPPY'">
                  راضی</a-tag
                >
                <a-tag color="red" v-if="record.orderLabel === 'UN_HAPPY'">
                  ناراضی</a-tag
                >
                <a-tag color="default" v-if="record.orderLabel === 'NEUTRAL'">
                  خنثی</a-tag
                >
              </span>
              <span>
                <a-tag color="warning" v-if="record.degreeLabel === 'GOLD'">
                  طلایی</a-tag
                >
                <a-tag color="default" v-if="record.degreeLabel === 'SILVER'">
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
                <a-tag color="green" v-if="record.isActive"> فعال</a-tag>
                <a-tag color="red" v-else> غیرفعال</a-tag>
              </span>
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="customer-action-container">
                <div class="customer-action-button">
                  <a @click="showModal(record.id, record.isActive)"
                    >تغییر وضعیت</a
                  >
                </div>
                <!-- <a-divider type="vertical" /> -->
                <div class="customer-action-button">
                  <a>جزئیات</a>
                </div>
              </div>
            </template>
          </template>
        </a-table>
        <a-modal v-model:visible="visible" title="تغییر وضعیت مشتری">
          <p>
            آیا از تغییر وضعیت مشتری به
            <a-typography-text
              type="success"
              v-if="!itemForChangeStatus.isActive"
              >فعال</a-typography-text
            >
            <a-typography-text type="danger" v-else>غیرفعال</a-typography-text>
            مطمئن هستید؟
          </p>
          <template #footer>
            <a-button key="back" @click="hideModal">بستن</a-button>
            <a-button
              type="primary"
              @click="changeCustomerStatus"
              v-if="!itemForChangeStatus.isActive"
              >فعال</a-button
            >
            <a-button type="primary" @click="changeCustomerStatus" v-else
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
    margin: 0 4px;
    a {
      color: #1894ff;
    }
  }
}
</style>
