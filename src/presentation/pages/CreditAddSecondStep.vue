<script lang="ts" setup>
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import { hintType } from '@/core/types/hints.type'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'
import { computed, onMounted, ref, Ref } from 'vue'
import {
  getCustomersInGroup,
  initHandler,
} from '@/logics/specific/creditAddSecondStep.handler'
import { TableColumnType } from 'ant-design-vue'
import { groupItemTitle } from '@/core/types/group.type'
import BConfirmModal from '@/presentation/components/shared/atoms/BConfirmModal.vue'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { goToPath } from '@/logics/shared/route.handler'
import { sendDataToServerHandler } from '@/logics/specific/creditAddFirstStep.handler'
import { groupCustomer, groupCustomerItem } from '@/core/types/customer.type'

const groupOptions: Ref<{ label: string; value: string }[]> = ref([])
const groupItems: Ref<groupItemTitle[] | undefined> = ref([])
const hints = t('pages.Credit.Add.SecondStep.hints') as unknown as hintType[]
const selectedGroup: Ref<string | undefined> = ref()
const selectedGroups: Ref<groupItemTitle[]> = ref([])
const targetCustomerColumn: TableColumnType<{
  name: string
  phoneNumber: string
}>[] = [
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

const targetModalVisibility = ref(false)
const openTargetCustomerModal = () => (targetModalVisibility.value = true)
const closeTargetCustomerModal = () => (targetModalVisibility.value = false)
const targetId = ref('')
const targetCustomerList: Ref<groupCustomerItem[]> = ref([])
const targetCustomer: Ref<groupCustomer | undefined> = ref()
const targetCustomerListPagination = computed(() => ({
  total: targetCustomer.value?.totalCount,
  current: targetCustomer.value?.page,
  pageSize: 10,
}))
const showTargetCustomerModal = async (record: groupItemTitle) => {
  openTargetCustomerModal()
  targetId.value = record.groupId
  const res = await getCustomersInGroup(record.groupId)
  if (res.data) {
    targetCustomer.value = res.data
    targetCustomerList.value = res.data.items
  }
}
const targetCustomerChange = async (paginationData: {
  total?: number
  current?: number
  pageSize: number
}) => {
  const res = await getCustomersInGroup(targetId.value, paginationData.current)
  if (res.data) {
    targetCustomer.value = res.data
    targetCustomerList.value = res.data.items
  }
}

const currentPage = ref(1)
const pagination = computed(() => ({
  total: selectedGroups.value.length,
  current: currentPage.value,
  pageSize: 10,
}))
const deleteModalShow = ref(false)
const temporaryGroupRowData: Ref<groupItemTitle | undefined> = ref()

const groupTableColumn: TableColumnType<{
  title: string
  customerCount: number
}>[] = [
  {
    title: 'عنوان جدول',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'مشتریان هدف',
    key: 'customersCount',
    dataIndex: 'customersCount',
  },
  {
    title: 'عملیات',
    key: 'actions',
    dataIndex: 'actions',
  },
]

// true => repeated
// false => not repeated
const checkRepeatedGroupInSelectedGroupsList = () =>
  groupItems.value
    ? selectedGroups.value.indexOf(
        groupItems.value.filter((el) => el.groupId === selectedGroup.value)[0]
      ) !== -1
    : true

const addSelectedGroupToSelectedList = () => {
  if (checkRepeatedGroupInSelectedGroupsList()) {
    showErrorMessage('گروه وارد شده تکراری است.')
    return
  }

  if (selectedGroup.value && groupItems.value)
    selectedGroups.value.push(
      ...groupItems.value.filter((el) => el.groupId === selectedGroup.value)
    )
}

const onChange = (paginationData: {
  current: number
  pageSize: number
  total: number
}) => (currentPage.value = paginationData.current)

const showDeleteModal = (rowData: groupItemTitle) => {
  deleteModalShow.value = true
  temporaryGroupRowData.value = rowData
}
const closeDeleteModal = () => {
  deleteModalShow.value = false
  temporaryGroupRowData.value = undefined
}

const sendData = async () => {
  await sendDataToServerHandler(selectedGroups.value)
}

const deleteRowFromSelectedGroups = () => {
  if (temporaryGroupRowData.value) {
    const index = selectedGroups.value.indexOf(temporaryGroupRowData.value)
    if (index !== -1) selectedGroups.value.splice(index, 1)
  }
  temporaryGroupRowData.value = undefined
  deleteModalShow.value = false
}

onMounted(async () => {
  const res = await initHandler()
  groupItems.value = res.data?.items
  res.data?.items?.forEach((el) => {
    groupOptions.value?.push({ label: el.title, value: el.groupId })
  })
})
</script>

<template>
  <div>
    <hint-collapse :hints="hints" />

    <div class="flex flex-wrap flex-row my-10 items-end">
      <div class="flex flex-col">
        <span style="font-weight: 500; font-size: 16px"> دسته‌بندی </span>
        <b-select
          v-model:value="selectedGroup"
          :options="groupOptions"
          place-holder="دسته‌بندی مورد نظر را انتخاب کنید"
        />
      </div>

      <a-button
        type="primary"
        class="button-secondary mx-4"
        @click="addSelectedGroupToSelectedList"
      >
        افزودن به لیست
      </a-button>
    </div>

    <a-table
      :columns="groupTableColumn"
      :pagination="pagination"
      :data-source="selectedGroups"
      class="mt-4"
      @change="onChange"
    >
      <template #bodyCell="{ column, record }">
        <div
          v-if="column.key === 'customersCount'"
          class="customer-action-container"
        >
          <div class="customer-action-button">
            <a @click="showTargetCustomerModal(record)">
              {{ record.customersCount }}
            </a>
          </div>
        </div>
        <div v-if="column.key === 'actions'" class="customer-action-container">
          <div class="customer-action-button">
            <a-typography-text type="danger" @click="showDeleteModal(record)">
              حذف
            </a-typography-text>
          </div>
        </div>
      </template>
    </a-table>

    <b-confirm-modal
      v-model:value="deleteModalShow"
      ok-text="حذف"
      cancel-text="بستن"
      ok-type="primary"
      title="حذف دسته‌بندی از لیست مشتریان هدف"
      content="آیا از حذف دسته‌بندی از لیست مشتریان هدف مطمئن هستید؟"
      @ok="deleteRowFromSelectedGroups"
      @cancel="closeDeleteModal"
    />

    <a-modal
      v-model:visible="targetModalVisibility"
      title="مشتریان هدف"
      cancel-text="بستن"
      @ok="closeTargetCustomerModal"
      @cancel="closeTargetCustomerModal"
    >
      <a-table
        :columns="targetCustomerColumn"
        :data-source="targetCustomerList"
        :pagination="targetCustomerListPagination"
        @change="targetCustomerChange"
      />
    </a-modal>

    <div class="text-left">
      <a-button
        type="primary"
        class="button-secondary"
        @click="goToPath('/credits/add/first-step')"
      >
        مرحله قبل
      </a-button>
      <a-button type="primary" class="button-secondary mx-2" @click="sendData">
        ثبت
      </a-button>
    </div>
  </div>
</template>
