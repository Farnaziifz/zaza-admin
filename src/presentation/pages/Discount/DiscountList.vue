<script lang="ts" setup async>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import PlusIcon from '/src/presentation/components/shared/atoms/PlusIcon.vue'
import { TableProps } from 'ant-design-vue'
import { discountCustomerGroup } from '@/core/types/discounts.type'
import { ref, onBeforeMount, computed, reactive } from 'vue'
import {
  initPageHandler,
  chnageDiscountStatus,
  deleteDiscount,
  getDiscoutGroup,
  getDiscountListRe,
} from '../../../logics/specific/discount.handler'
import router from '@/resources/router'
import {
  columns,
  customerGroupColumns,
  data,
  customerData,
} from '../../../core/constants/discount.options'
import { SearchOutlined } from '@ant-design/icons-vue'
import _ from 'lodash'
import {
  queryList,
  querySearch,
  queryType,
  querySort,
} from '@/logics/shared/queryBuilder'
import { TablePaginationConfig } from 'ant-design-vue'

const pagination = computed(() => ({
  total: data.value.totalCount,
  current: data.value.page,
  pageSize: 10,
}))

const itemForChangeStatus = reactive({ isActive: false, id: '' })
const itemForDelete = reactive({ id: '', title: '' })
const modalSubmissionButtonLoader = ref(false)
let activeItemInModal: [] = reactive([])
const visibleGroupModal = ref<boolean>(false)

const turnOnLoader = () => (modalSubmissionButtonLoader.value = true)
const turnOffLoader = () => (modalSubmissionButtonLoader.value = false)
onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  data.value = await initPageHandler(page, pageSize)
})
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
  const res = await getDiscountListRe(paginate.current, q)
  if (res.data) data.value = res.data
}
const visibleStatusModal = ref<boolean>(false)
const visibleDeleteModal = ref<boolean>(false)
const showModal = (item: string, isActive: boolean) => {
  visibleStatusModal.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const showDeleteModal = (item: string, title: string) => {
  visibleDeleteModal.value = true
  itemForDelete.id = item
  itemForDelete.title = title
}
const changeDiscountStatus = async () => {
  turnOnLoader()
  await chnageDiscountStatus(itemForChangeStatus.id)
  turnOffLoader()
  visibleStatusModal.value = false
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
}
const confirmModal = async () => {
  await deleteDiscount(itemForDelete.id)
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
  visibleDeleteModal.value = false
}
const hideModal = () => {
  visibleStatusModal.value = false
}
const gotoDetails = (item: string) => {
  router.push({ name: 'discount-details', params: { id: item } })
}
const openGroupModal = async (item: []) => {
  const page = 1
  const pageSize = 10
  customerData.value = await getDiscoutGroup(item, page, pageSize)
  activeItemInModal = item
  visibleGroupModal.value = true
}
const handleCancel = () => {
  visibleGroupModal.value = false
}
const customerpagination = computed(() => ({
  total: customerData.value.totalCount,
  current: customerData.value.page,
  pageSize: 10,
}))
const onChangeCustomerGroup: TableProps<discountCustomerGroup>['onChange'] =
  async (paginate) => {
    customerData.value = await getDiscoutGroup(
      activeItemInModal,
      paginate.current,
      paginate.pageSize
    )
  }
const goToAdd = () => {
  router.push({ name: 'discount-add' })
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
const search = async (selectedKeys: querySearch[]) => {
  const searchQueries = selectedKeys.map((el) => {
    el.keyword = decodeURI(el.keyword)
    return {
      type: queryType.SEARCH,
      data: el,
    }
  })
  const res = await getDiscountListRe(1, searchQueries)
  if (res.data) data.value = res.data
}
const reset = async () => {
  const res = await getDiscountListRe(1)
  if (res.data) data.value = res.data
}
</script>
<template>
  <content-layout>
    <template #content-title>کد تخفیف</template>
    <template #content-actions>
      <a-button type="primary" @click="goToAdd">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن کد تخفیف</span>
      </a-button>
    </template>

    <template #content-body>
      <a-table
        :columns="columns"
        :data-source="data.items"
        :pagination="pagination"
        @change="onChange"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'amount'">
            <span v-if="record.type === 'CASH'">{{
              $filters.toPersianCurrency(record.amount, 'تومان')
            }}</span>
            <span v-else>{{ record.amount }} درصد </span>
          </template>
          <template v-else-if="column.key === 'isActive'">
            <span>
              <a-tag v-if="record.isActive" color="green"> فعال</a-tag>
              <a-tag v-else color="red"> غیرفعال</a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'setting'">
            <span v-if="record.consumeType">
              <a-tag v-if="record.consumeType === 'SEVERAL_TIMES'" color="blue">
                چندبار مصرف</a-tag
              >
              <a-tag v-if="record.consumeType === 'ONCE'" color="blue"
                >یکبار مصرف</a-tag
              >
            </span>
            <span v-if="record.stateType">
              <a-tag v-if="record.stateType === 'CONSTANT'" color="blue">
                ثابت</a-tag
              >
              <a-tag v-if="record.stateType === 'VARIABLE'" color="blue"
                >متغیر</a-tag
              >
            </span>
            <span v-if="record.type">
              <a-tag v-if="record.type === 'CASH'" color="blue">تومانی</a-tag>
              <a-tag v-if="record.type === 'PERCENTAGE'" color="blue"
                >درصدی</a-tag
              >
            </span>
          </template>
          <template v-else-if="column.key === 'customersCount'">
            <a class="customer-count" @click="openGroupModal(record.groupIds)"
              >{{ record.customersCount }} مشتری</a
            >
          </template>
          <template v-else-if="column.key === 'startAt'">
            <p>{{ $filters.toPersianDate(record.startAt) }}</p>
            <p>الی</p>
            <p>{{ $filters.toPersianDate(record.expireAt) }}</p>
          </template>
          <template v-else-if="column.key === 'actions'">
            <div class="customer-action-container">
              <div class="customer-action-button">
                <a @click="showModal(record.id, record.isActive)"
                  >تغییر وضعیت</a
                >
              </div>
              <div class="customer-action-button">
                <a @click="gotoDetails(record.id)">جزئیات</a>
              </div>
              <div class="customer-action-button">
                <a-typography-text
                  type="danger"
                  @click="showDeleteModal(record.id, record.title)"
                  >حذف</a-typography-text
                >
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
              :placeholder="`جستجو در عنوان تخفیف`"
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
      <a-modal
        v-model:visible="visibleStatusModal"
        title="تغییر وضعیت کد تخفیف"
      >
        <p>
          آیا از تغییر وضعیت کد تخفیف به
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
            @click="changeDiscountStatus"
            >فعال</a-button
          >
          <a-button v-else type="primary" @click="changeDiscountStatus"
            >غیرفعال</a-button
          >
        </template>
      </a-modal>
      <a-modal
        v-model:visible="visibleDeleteModal"
        title="حذف کوپن"
        ok-text="حذف"
        cancel-text="بستن"
        @ok="confirmModal"
      >
        <p>آیا از حذف کوپن "{{ itemForDelete.title }}" مطمئن هستید؟</p>
      </a-modal>
      <a-modal v-model:visible="visibleGroupModal" title="مشتریان هدف">
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
    </template>
  </content-layout>
</template>

<style lang="scss" scoped>
.customer-count {
  color: #1894ff;
  white-space: nowrap;
}
.ant-tag {
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
