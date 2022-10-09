import { TableColumnType } from 'ant-design-vue'
import { products, productsList } from '../../core/types/product.type'
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

export const productListData: Ref<productsList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
