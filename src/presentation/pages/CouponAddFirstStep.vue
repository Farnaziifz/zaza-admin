<script setup lang="ts">
import { ref, Ref, computed } from 'vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import { CouponsTypesType } from '../../core/enums/couponsType.enum'
import { productsList, products } from '../../core/types/product.type'
import { getProductList } from '../../logics/specific/products.handler'
import { t } from 'vui18n'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { TableColumnType } from 'ant-design-vue'

const titleValue = ref('')
const selectedCouponType = ref('')
const productsColumns: TableColumnType<products>[] = [
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
const productListData: Ref<productsList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const couponTypeOptions: any[] = []
for (const type in CouponsTypesType)
  couponTypeOptions.push({
    value: type,
    label: t(`types.couponTypeEnum.${type}`),
  })

//Category Picking
const showCategoryPickingModal = ref(false)
const openCategoryPickingModal = () => {
  showCategoryPickingModal.value = true
}

// ProductPicking
const showProductPickingModal = ref(false)
const openProductPickingModal = () => {
  showProductPickingModal.value = true
  onGetProductList()
}
const onGetProductList = async () => {
  const page = 1
  const pageSize = 10
  productListData.value = await getProductList(page, pageSize)
}

const productPagination = computed(() => ({
  total: productListData.value.totalCount,
  current: productListData.value.page,
  pageSize: 10,
}))
const rowSelection = ref({
  onChange: (
    selectedRowKeys: (string | number)[],
    selectedRows: productsList[]
  ) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      'selectedRows: ',
      selectedRows
    )
  },
  onSelect: (
    record: productsList,
    selected: boolean,
    selectedRows: productsList[]
  ) => {
    console.log(record, selected, selectedRows)
  },
  onSelectAll: (
    selected: boolean,
    selectedRows: productsList[],
    changeRows: productsList[]
  ) => {
    console.log(selected, selectedRows, changeRows)
  },
})
</script>

<template>
  <a-card style="margin: 8px 0; background-color: #f6f6f6">
    <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
      اطلاعات کوپن
    </h3>
    <div>
      <div class="flex items-center">
        <inputWithHadline
          v-model:value="titleValue"
          type="text"
          placeholder=" عنوان کوپن را وارد کنید"
          headline="عنوان کوپن"
        />

        <div class="mx-4">
          <div>نوع کوپن</div>

          <BSelect
            v-model:value="selectedCouponType"
            placeholder="نوع کوپن را انتخاب کنبد"
            :options="couponTypeOptions"
          />
        </div>
        <div class="mx-4">
          <InputWithHeadlineAndUnit
            v-if="selectedCouponType === 'BUY_ABOVE_SPECIFIC_PRICE'"
            unit="تومان"
            placeholder="حداقل قیمت سفارش را وارد کنید"
            headline="حداقل قیمت سفارش"
          />
        </div>
      </div>

      <div
        class="mt-4"
        v-if="selectedCouponType === CouponsTypesType.BUY_SPECIFIC_PRODUCT"
      >
        <div class="flex flex-col" style="max-width: 256px">
          محصولات
          <!-- v-model:value="inputValue" -->
          <a-input placeholder="محصولات را انتخاب کنید" type="text">
            <template #addonAfter>
              <a-button type="link" @click="openProductPickingModal">
                <template #icon>
                  <unordered-list-outlined />
                </template>
              </a-button>
            </template>
          </a-input>
        </div>

        <a-modal v-model:visible="showProductPickingModal" title="انتخاب محصول">
          <div v-if="productListData.items && productListData.items.length">
            <a-table
              :columns="productsColumns"
              :pagination="productPagination"
              :data-source="productListData.items"
              :row-selection="rowSelection"
            ></a-table>
            <!-- @change="onChange" -->
          </div>
        </a-modal>
      </div>

      <div
        class="mt-4"
        v-if="
          selectedCouponType === CouponsTypesType.BUY_FROM_SPECIFIC_CATEGORY
        "
      >
        <div class="flex flex-col" style="max-width: 256px">
          دسته‌بندی
          <!-- v-model:value="inputValue" -->
          <a-input placeholder="دسته‌بندی را انتخاب کنید" type="text">
            <template #addonAfter>
              <a-button type="link" @click="openCategoryPickingModal">
                <template #icon>
                  <unordered-list-outlined />
                </template>
              </a-button>
            </template>
          </a-input>
        </div>

        <a-modal
          v-model:visible="showCategoryPickingModal"
          title="انتخاب دسته‌بندی"
        >
        </a-modal>
      </div>
    </div>
  </a-card>
  <div class="line"></div>
  <div class="btn-container flex justify-end">
    <a-button type="primary">
      <span>مرحله بعد</span>
    </a-button>
  </div>
</template>

<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
  margin: 32px 0;
}
</style>
