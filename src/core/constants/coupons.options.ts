import { TableColumnType } from 'ant-design-vue'
import { products, productsList } from '../../core/types/product.type'
import { categoryList } from '../../core/types/category.type'
import { Ref, ref } from 'vue'

export const productsColumns: TableColumnType<products>[] = [
  {
    title: 'عکس',
    key: 'imageId',
    dataIndex: 'imageId',
  },
  {
    title: 'نام محصول',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'قیمت محصول',
    key: 'price',
    dataIndex: 'price',
  },
]
export const productsSelectColumns: TableColumnType<products>[] = [
  {
    title: 'عکس',
    key: 'imageId',
    dataIndex: 'imageId',
  },
  {
    title: 'نام محصول',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'قیمت محصول',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'عملیات',
    key: 'actions',
    dataIndex: 'actions',
  },
]

export const productListData: Ref<productsList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
  key: 0,
})
export const categoryListData: Ref<categoryList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
