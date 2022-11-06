<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { Ref, ref, onBeforeMount, computed, reactive } from 'vue'
import { groupList, groups } from '../../../core/types/group.type'
import {
  getGroupList,
  deleteGroup,
  groupStatus,
} from '../../../logics/specific/group.handler'
import { TableColumnType, TableProps } from 'ant-design-vue'
import router from '@/resources/router'
import PlusIcon from '/src/presentation/components/shared/atoms/PlusIcon.vue'

const data: Ref<groupList | undefined> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

const columns: TableColumnType<groups | undefined>[] = [
  {
    title: 'عنوان دسته‌بندی',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'تعداد مشتریان',
    key: 'customersCount',
    dataIndex: 'customersCount',
  },
  {
    title: 'وضعیت دسته‌بندی',
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
const visible = ref<boolean>(false)
const visibleDeleteModal = ref<boolean>(false)
const itemForDelete = reactive({ id: '', title: '' })

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  const res = await getGroupList(page, pageSize)
  data.value = res
})

const pagination = computed(() => ({
  total: data.value?.totalCount,
  current: data.value?.page,
  pageSize: 10,
}))

const onChange: TableProps<groupList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  data.value = await getGroupList(paginate.current, paginate.pageSize)
}

const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}

const goToDetails = (item: string) => {
  router.push({ name: 'group-details', params: { id: item } })
}

const hideModal = () => {
  visible.value = false
}

const changegroupStatus = async () => {
  await groupStatus(itemForChangeStatus.id)
  hideModal()
}

const showDeleteModal = (item: string, title: string) => {
  visibleDeleteModal.value = true
  itemForDelete.id = item
  itemForDelete.title = title
}

const confirmModal = async () => {
  await deleteGroup(itemForDelete.id)
  data.value = await getGroupList(
    pagination.value.current,
    pagination.value.pageSize
  )
  visibleDeleteModal.value = false
}
const goToAdd = () => {
  router.push({ path: '/category/add/first-step' })
}
</script>

<template>
  <content-layout>
    <template #content-title>دسته‌بندی‌</template>
    <template #content-actions>
      <a-button type="primary" @click="goToAdd" class="button-secondary">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن دسته‌بندی جدید</span>
      </a-button>
    </template>
    <template #content-body>
      <div v-if="data?.items && data.items.length">
        <a-table
          :columns="columns"
          :data-source="data.items"
          :pagination="pagination"
          @change="onChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'customersCount'"
              ><span>{{ record.customersCount }}</span> مشتری
            </template>
            <template v-if="column.key === 'isActive'">
              <a-tag v-if="record.isActive === true" color="green"> فعال</a-tag>
              <a-tag v-if="record.isActive === false" color="red">
                غیرفعال</a-tag
              >
            </template>
            <template v-else-if="column.key === 'actions'">
              <div class="customer-action-container">
                <div class="customer-action-button">
                  <a @click="showModal(record.groupId, record.isActive)"
                    >تغییر وضعیت</a
                  >
                </div>
                <div class="customer-action-button">
                  <a @click="goToDetails(record.groupId)">جزئیات</a>
                </div>
                <a-typography-text
                  class="cursor-pointer"
                  type="danger"
                  @click="showDeleteModal(record.groupId, record.title)"
                  >حذف</a-typography-text
                >
              </div>
            </template>
          </template>
        </a-table>
        <a-modal v-model:visible="visible" title="تغییر وضعیت دسته‌بندی">
          <p>
            آیا از تغییر وضعیت دسته‌بندی به
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
              @click="changegroupStatus"
              >فعال</a-button
            >
            <a-button v-else type="primary" @click="changegroupStatus"
              >غیرفعال</a-button
            >
          </template>
        </a-modal>
        <a-modal
          v-model:visible="visibleDeleteModal"
          title="حذف دسته‌بندی"
          ok-text="حذف"
          cancel-text="بستن"
          @ok="confirmModal"
        >
          <p>آیا از حذف دسته‌بندی "{{ itemForDelete.title }}" مطمئن هستید؟</p>
        </a-modal>
      </div>
    </template>
  </content-layout>
</template>
