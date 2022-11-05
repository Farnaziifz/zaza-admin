<script lang="ts" setup>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import BConfirmModal from '/src/presentation/components/shared/atoms/BConfirmModal.vue'
import { onMounted, ref, Ref, computed } from 'vue'
import _ from 'lodash'
import { groupItemTitle } from '@/core/types/group.type'
import {
  getGroupTitle,
  getCustomersInGroup,
  saveDiscountThirdStep,
} from '../../../logics/specific/discount.handler'
import { showErrorMessage } from '@/logics/shared/message.handler'
import { TableColumnType } from 'ant-design-vue'
import { groupCustomer, groupCustomerItem } from '@/core/types/customer.type'
import { goToPath } from '@/logics/shared/route.handler'
import { useDiscountStore } from '../../../resources/store/discount.store'

const discountStore = useDiscountStore()
const selectedGroup: Ref<string | undefined> = ref()
const groupOptions: Ref<{ label: string; value: string }[]> = ref([])
const groupItems: Ref<groupItemTitle[] | undefined> = ref([])
const targetCustomerList: Ref<groupCustomerItem[]> = ref([])
const selectedGroups: Ref<groupItemTitle[]> = ref([])
const targetCustomer: Ref<groupCustomer | undefined> = ref()
const temporaryGroupRowData: Ref<groupItemTitle | undefined> = ref()
const currentPage = ref(1)
const targetId = ref('')
const deleteModalShow = ref(false)
const confirmToBackModal = ref(false)
const targetModalVisibility = ref(false)
const openTargetCustomerModal = () => (targetModalVisibility.value = true)
const closeTargetCustomerModal = () => (targetModalVisibility.value = false)

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

const groupTableColumn: TableColumnType<{
  title: string
  customerCount: number
}>[] = [
  {
    title: 'دسته‌بندی',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'تعداد مشتریان',
    key: 'customersCount',
    dataIndex: 'customersCount',
  },
  {
    title: 'عملیات',
    key: 'actions',
    dataIndex: 'actions',
  },
]

onMounted(async () => {
  const res = await getGroupTitle()
  groupItems.value = res.data?.items
  res.data?.items?.forEach((el) => {
    groupOptions.value?.push({ label: el.title, value: el.groupId })
  })
})

const showTargetCustomerModal = async (record: groupItemTitle) => {
  openTargetCustomerModal()
  targetId.value = record.groupId
  const res = await getCustomersInGroup(record.groupId)
  if (res.data) {
    targetCustomer.value = res.data
    targetCustomerList.value = res.data.items
  }
}
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

const targetCustomerListPagination = computed(() => ({
  total: targetCustomer.value?.totalCount,
  current: targetCustomer.value?.page,
  pageSize: 10,
}))

const sumOfCustomerTargetGroupSelected = computed(() => {
  const sumTargetCustomer = selectedGroups.value
    .map((el) => {
      return el.customersCount
    })
    .reduce((a, b) => {
      return _.toNumber(a) + _.toNumber(b)
    }, 0)
  return sumTargetCustomer
})
const pagination = computed(() => ({
  total: selectedGroups.value.length,
  current: currentPage.value,
  pageSize: 10,
}))
const onChange = (paginationData: {
  current: number
  pageSize: number
  total: number
}) => (currentPage.value = paginationData.current)

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
const showDeleteModal = (rowData: groupItemTitle) => {
  deleteModalShow.value = true
  temporaryGroupRowData.value = rowData
}
const confirmToBack = () => {
  confirmToBackModal.value = true
}
const closeDeleteModal = () => {
  deleteModalShow.value = false
  temporaryGroupRowData.value = undefined
}
const closeConfirmBackModal = () => {
  confirmToBackModal.value = false
}
const deleteRowFromSelectedGroups = () => {
  if (temporaryGroupRowData.value) {
    const index = selectedGroups.value.indexOf(temporaryGroupRowData.value)
    if (index !== -1) selectedGroups.value.splice(index, 1)
  }
  temporaryGroupRowData.value = undefined
  deleteModalShow.value = false
}

const onSendThirdData = () => {
  saveDiscountThirdStep({
    promotionAssignedGroups: selectedGroups.value,
  })
  goToPath('/discount/add/fourth-step')
}

if (
  discountStore.promotionAssignedGroups &&
  discountStore.promotionAssignedGroups.length
) {
  selectedGroups.value = discountStore.promotionAssignedGroups
}
</script>
<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: 'انتخاب مشتریان هدف',
            description:
              'با انتخاب مشتریان هدف، شما می‌توانید مشخص کنیدکد تخفیف شامل کدام  یک از دسته بندی های مشتریان شما شود.',
          },
          {
            body: 'دسته‌بندی',
            description:
              'برای افزودن مشتریان هدف، ابتدا در بخش دسته بندی، دسته مورد نظر خود را بسازید.',
          },
        ]"
      />
      <div class="flex flex-wrap flex-row my-10 items-end">
        <div class="flex flex-col">
          <span style="font-weight: 500; font-size: 16px">دسته‌بندی</span>
          <BSelect
            v-model:value="selectedGroup"
            placeholder="دسته‌بندی مورد نظر را انتخاب کنید"
            :options="groupOptions"
          />
        </div>
        <a-button
          type="primary"
          class="button-secondary mx-4"
          :disabled="!selectedGroup"
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
                {{ record.customersCount }} مشتری
              </a>
            </div>
          </div>
          <div
            v-if="column.key === 'actions'"
            class="customer-action-container"
          >
            <div class="customer-action-button">
              <a-typography-text type="danger" @click="showDeleteModal(record)">
                حذف
              </a-typography-text>
            </div>
          </div>
        </template>
      </a-table>
      <div class="sum-of-target" v-if="selectedGroups.length">
        <span class="key">تعداد مشتریان هدف انتخاب شده :</span>
        <span> {{ sumOfCustomerTargetGroupSelected }} مشتری</span>
      </div>

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
      <div class="line"></div>
      <div class="text-left mt-4">
        <a-button @click="confirmToBack"> مرحله قبل </a-button>
        <a-button
          type="primary"
          class="button-secondary mx-2"
          @click="onSendThirdData"
        >
          مرحله بعد
        </a-button>
      </div>
      <b-confirm-modal
        v-model:value="confirmToBackModal"
        ok-text="می‌پذیرم"
        cancel-text="بستن"
        ok-type="primary"
        title="بازگشت به صفحه قبل"
        content="در صورت بازگشت به صفحه قبلی اطلاعات وارد شده در این صفحه ذخیره نمی‌شود."
        @ok="goToPath('/discount/add/second-step')"
        @cancel="closeConfirmBackModal"
      />
    </template>
  </content-layout>
</template>

<style lang="scss" scoped>
.sum-of-target {
  margin-top: -45px;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
  margin: 32px 0;
}
.key {
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #000000;
  margin-left: 8px;
}
</style>
