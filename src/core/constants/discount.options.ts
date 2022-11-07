import { TableColumnType } from 'ant-design-vue'
import {
  discounts,
  discountsList,
  discountCustomerGroup,
  discountGroup,
} from '@/core/types/discounts.type'
import { Ref, ref } from 'vue'

export const columns: TableColumnType<discounts>[] = [
  {
    title: 'عنوان تخفیف',
    key: 'title',
    dataIndex: 'title',
    customFilterDropdown: true,
  },
  {
    title: 'تنظیمات تخفیف',
    key: 'setting',
    dataIndex: 'setting',
  },
  {
    title: 'مقدار تخفیف',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'مشتریان هدف',
    dataIndex: 'customersCount',
    key: 'customersCount',
  },
  {
    title: 'وضعیت تخفیف',
    dataIndex: 'isActive',
    key: 'isActive',
    filters: [
      { text: 'فعال', value: 'true' },
      { text: 'غیرفعال', value: 'false' },
    ],
  },
  {
    title: 'زمان شروع و پایان',
    dataIndex: 'startAt',
    key: 'startAt',
    sorter: true,
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

export const customerGroupColumns: TableColumnType<discountCustomerGroup>[] = [
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

export const data: Ref<discountsList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

export const customerData: Ref<discountCustomerGroup> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

export const serverData: Ref<discounts> = ref({
  id: '',
  title: '',
  type: '',
  consumeType: '',
  stateType: '',
  amount: 0,
  startAt: '',
  expireAt: '',
  isActive: false,
  customersCount: 0,
  promotionAssignedGroups: [],
  promotionSteps: [],
})

export const discountGroupData: Ref<discountGroup> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
