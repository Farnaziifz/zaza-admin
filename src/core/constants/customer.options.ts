import { TableColumnType } from 'ant-design-vue'
import {
  customer,
  customerList,
  walletBalance,
  transactionHistoryList,
  customerOrderList,
  customerPaymentList,
  customerCommentList,
  customerGroupList,
  customerCommentDetailsList,
  customerOrderDetails,
} from '../../core/types/customer.type'
import { Ref, ref } from 'vue'

export const columns: TableColumnType<customer>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'تاریخ عضویت',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'میانگین پرداختی',
    dataIndex: 'totalExpenses',
    key: 'totalExpenses',
  },
  {
    title: 'تعداد سفارش',
    dataIndex: 'numberOfOrder',
    key: 'numberOfOrder',
  },
  {
    title: 'ارزش مشتری',
    dataIndex: 'value',
    key: 'value',
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
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

export const data: Ref<customerList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

export const profileData: Ref<customer> = ref({
  id: '',
  fullName: '',
  createdAt: 0,
  numberOfOrder: 0,
  totalExpenses: 0,
  value: 0,
  orderLabel: '',
  DegreeLabel: '',
  isActive: false,
})

export const walletBalanceData: Ref<walletBalance> = ref({
  amount: 0,
})

export const transactionWalletData: Ref<transactionHistoryList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})

export const customerOrderData: Ref<customerOrderList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
export const customerPaymentData: Ref<customerPaymentList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
export const customerCommentData: Ref<customerCommentList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
export const customerGroupData: Ref<customerGroupList> = ref([])

export const commentData: Ref<customerCommentDetailsList> = ref([])

export const commnetOrderData: Ref<customerOrderDetails> = ref({
  createdAt: '',
  finalPrice: 0,
  trackingCode: '',
  products: [],
})
