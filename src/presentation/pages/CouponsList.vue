<script lang="ts" setup async>
import ContentLayout from '../layouts/ContentLayout.vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import { TableColumnType, TableProps } from 'ant-design-vue'
import { copouns, copounsList } from '../../core/types/coupons.type'
import { Ref, ref, onBeforeMount, computed, reactive } from 'vue'
import {
  initPageHandler,
  changeCopounsStatus,
  deleteCopouns,
} from '../../logics/specific/coupons.handler'
import PlusIcon from '@/presentation/components/shared/atoms/PlusIcon.vue'
const columns: TableColumnType<copouns>[] = [
  {
    title: 'عنوان کوپن',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'نوع کوپن',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'پاداش',
    dataIndex: 'reward',
    key: 'reward',
  },
  {
    title: 'وضعیت کوپن',
    dataIndex: 'isActive',
    key: 'isActive',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]
const itemForChangeStatus = reactive({ isActive: false, id: '' })
const itemForDelete = reactive({ id: '', title: '' })
const data: Ref<copounsList> = ref({
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
  // showSizeChanger: true,
}))

const onChange: TableProps<copounsList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  data.value = await initPageHandler(paginate.current, paginate.pageSize)
}
const visible = ref<boolean>(false)
const visibleDeleteModal = ref<boolean>(false)

const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const hideModal = () => {
  visible.value = false
}
const showDeleteModal = (item: string, title: string) => {
  visibleDeleteModal.value = true
  itemForDelete.id = item
  itemForDelete.title = title
}
const confirmModal = async () => {
  await deleteCopouns(itemForDelete.id)
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
  visibleDeleteModal.value = false
}
const changeCopounSatatus = async () => {
  await changeCopounsStatus(itemForChangeStatus.id)
  visible.value = false
  data.value = await initPageHandler(
    pagination.value.current,
    pagination.value.pageSize
  )
}
</script>

<template>
  <content-layout>
    <template #content-title>کوپن‌ها</template>
    <template #content-actions>
      <a-button type="primary">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن کوپن</span>
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
                  <a>جزئیات</a>
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
              @click="changeCopounSatatus"
              >فعال</a-button
            >
            <a-button v-else type="primary" @click="changeCopounSatatus"
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
      </div>
      <EmptyLayout v-else>
        <template #empty-text> کوپن یافت نشد. </template>
        <template #empty-action>
          <a-button type="primary" block>افزودن کوپن</a-button>
        </template>
      </EmptyLayout>
    </template>
  </content-layout>
</template>
