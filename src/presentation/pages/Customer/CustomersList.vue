<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import BadgeComponent from '/src/presentation/components/shared/Organisms/Badge.vue'
import { TablePaginationConfig } from 'ant-design-vue'
import {
  initPageHandler,
  chnageCustomerStatus,
  getCustomerList,
} from '@/logics/specific/customrtList.handler'
import { onBeforeMount, ref, reactive, computed } from 'vue'
import router from '@/resources/router'
import { columns, data } from '@/core/constants/customer.options'
import {
  queryList,
  querySearch,
  querySort,
  queryType,
} from '@/logics/shared/queryBuilder'
import _ from 'lodash'
import { SearchOutlined } from '@ant-design/icons-vue'

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

const onChange = async (
  paginate: TablePaginationConfig,
  filters: object,
  sorter: {
    columnKey: string
    order: string
    column?: object
  }
) => {
  const q: queryList = []

  if (filters) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    filters?.isActive?.forEach((el) => {
      q.push({
        type: queryType.FILTER,
        data: {
          field: 'IsActive',
          operand: '==',
          value: el,
        },
      })
    })
  }

  if (sorter.column !== undefined) {
    q.push({
      type: queryType.SORT,
      data: {
        field: _.upperFirst(sorter.columnKey),
        order: sorter.order === 'ascend' ? 'ASC' : 'DESC',
      } as querySort,
    })
  }
  const res = await getCustomerList(paginate.current, q)
  if (res.data) data.value = res.data
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

const search = async (selectedKeys: querySearch[]) => {
  const searchQueries = selectedKeys.map((el) => {
    el.keyword = decodeURI(el.keyword)
    return {
      type: queryType.SEARCH,
      data: el,
    }
  })
  const res = await getCustomerList(pagination.value.current, searchQueries)
  if (res.data) data.value = res.data
}
const reset = async () => {
  const res = await getCustomerList(1)
  if (res.data) data.value = res.data
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const searchInputChange = (e, setSelectedKeys, column) => {
  setSelectedKeys(
    e.target.value
      ? [
          {
            keyword: e.target.value,
            field: _.upperFirst(column.dataIndex),
          },
        ]
      : []
  )
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
          <template
            #customFilterDropdown="{ setSelectedKeys, selectedKeys, column }"
          >
            <div style="padding: 8px">
              <a-input
                ref="searchInput"
                :placeholder="`جستجو در نام مشتری`"
                :value="selectedKeys[0]?.keyword"
                style="width: 188px; margin-bottom: 8px; display: block"
                @change="searchInputChange($event, setSelectedKeys, column)"
              />
              <a-button
                type="primary"
                size="small"
                style="width: 90px"
                class="ml-2"
                @click="search(selectedKeys)"
              >
                <template #icon>
                  <SearchOutlined />
                </template>
                جستجو
              </a-button>
              <a-button
                size="small"
                style="width: 90px"
                @click="
                  () => {
                    reset()
                    setSelectedKeys([])
                  }
                "
              >
                پاک کردن
              </a-button>
            </div>
          </template>
          <template #customFilterIcon="{ filtered }">
            <search-outlined
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />
          </template>
        </a-table>
        <a-modal v-model:visible="visible" title="تغییر وضعیت مشتری">
          <p>
            آیا از تغییر وضعیت مشتری به
            <a-typography-text
              v-if="!itemForChangeStatus.isActive"
              type="success"
              >فعال
            </a-typography-text>
            <a-typography-text v-else type="danger">غیرفعال</a-typography-text>
            مطمئن هستید؟
          </p>
          <template #footer>
            <a-button key="back" @click="hideModal">بستن</a-button>
            <a-button
              v-if="!itemForChangeStatus.isActive"
              type="primary"
              @click="changeCustomerStatus"
              >فعال
            </a-button>
            <a-button v-else type="primary" @click="changeCustomerStatus"
              >غیرفعال
            </a-button>
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
