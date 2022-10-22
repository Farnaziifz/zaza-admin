<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import inputWithHadline from '/src/presentation/components/shared/molecules/InputWithHeadline.vue'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import { CouponsTypesType } from '../../../core/enums/couponsType.enum'
import { products, productsList } from '../../../core/types/product.type'
import { getProductList } from '../../../logics/specific/products.handler'
import { getCategoryList } from '../../../logics/specific/category.handler'
import { saveCouponDataFirstStep } from '../../../logics/specific/coupons.handler'
import { t } from 'vui18n'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { TableProps, TreeProps } from 'ant-design-vue'
import { category } from '../../../core/types/category.type'
import { useCouponStore } from '../../../resources/store/coupon.store'
import {
  productsSelectColumns,
  productListData,
  categoryListData,
} from '../../../core/constants/coupons.options'

const couponStore = useCouponStore()

const titleValue = ref('')
const selectedCouponType = ref('')
const couponTypeOptions: any[] = []
const btnDisabled = computed(() => {
  if (titleValue.value && selectedCouponType.value) {
    if (
      (selectedCouponType.value === CouponsTypesType.BUY_ABOVE_SPECIFIC_PRICE &&
        buyAboveSprecificPriceInput.value) ||
      (selectedCouponType.value ===
        CouponsTypesType.BUY_FROM_SPECIFIC_CATEGORY &&
        selectedItem.value.id) ||
      (selectedCouponType.value === CouponsTypesType.BUY_SPECIFIC_PRODUCT &&
        selectedOK.value.length)
    ) {
      return false
    } else if (selectedCouponType.value === CouponsTypesType.FIRST_ORDER) {
      return false
    }
  } else {
    return true
  }
  return true
})
const buyAboveSprecificPriceInput = ref()

const selectedProductKeyInPage: Ref<Map<string, products>> = ref(new Map())
const allSelectedProductInPages: Ref<Map<number, Map<string, products>>> = ref(
  new Map()
)
const currentPageNumber: Ref<number> = ref(1)

for (const type in CouponsTypesType)
  couponTypeOptions.push({
    value: type,
    label: t(`types.couponTypeEnum.${type}`),
  })

//Category Picking
const showCategoryPickingModal = ref(false)
const openCategoryPickingModal = async () => {
  showCategoryPickingModal.value = true
  await onGetCategortList()
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
  productListData.value.items.map((el) => {
    el['isActive'] = false
  })
}

const onGetCategortList = async () => {
  const page = 1
  const pageSize = 10
  const id = ''
  const res = await getCategoryList(page, pageSize, id)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  categoryListData.value.items = [...res]
}

const productPagination = computed(() => ({
  total: productListData.value.totalCount,
  current: productListData.value.page,
  pageSize: 5,
}))

const onChangeProductList: TableProps<productsList>['onChange'] = async (
  paginate
) => {
  currentPageNumber.value = paginate.current ?? 1
  selectedProductKeyInPage.value =
    allSelectedProductInPages.value.get(currentPageNumber.value) ?? new Map()

  productListData.value = await getProductList(
    paginate.current,
    paginate.pageSize
  )
}

// const onSelectChange = (keys: string[]) => {
//   selectedProductKeyInPage.value = new Map()
//   for (const key of keys) {
//     const product = productListData.value.items.find((c) => c.id === key)
//     if (!product) {
//       throw new Error()
//     }
//     selectedProductKeyInPage.value.set(key, product)
//   }
//   allSelectedProductInPages.value.set(
//     currentPageNumber.value,
//     selectedProductKeyInPage.value
//   )
// }

const selectedOK: Ref<products[]> = ref([])

const onProductPickerModalOkPress = () => {
  selectedOK.value = [...allSelectedProductInPages.value.values()]
    .map((c) => [...c.values()])
    .flat()
  showProductPickingModal.value = false
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const selectedItem: Ref<category> = ref({
  id: '',
  title: '',
  level: 0,
  isLeaf: false,
  key: '',
})
const onLoadData: TreeProps['loadData'] = async (treeNode) => {
  const test = await getCategoryList(1, 10, treeNode.id)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  treeNode.dataRef.children = test
  categoryListData.value.items = [...categoryListData.value.items]
}

const onSelectNode = (
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectedKeys,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  e: { selected: boolean; selectedNodes; node; event }
) => {
  console.log(selectedKeys)
  selectedItem.value = e.selectedNodes[0]
  showCategoryPickingModal.value = false
}

const nextStep = () => {
  saveCouponDataFirstStep({
    title: titleValue.value,
    type: selectedCouponType.value,
    value: {
      id: (() => {
        if (selectedCouponType.value === CouponsTypesType.BUY_SPECIFIC_PRODUCT)
          return selectedOK.value.map((el) => el.id)
        else if (
          selectedCouponType.value ===
          CouponsTypesType.BUY_FROM_SPECIFIC_CATEGORY
        )
          return selectedItem.value.id

        return undefined
      })(),
      amount: (() => {
        if (
          selectedCouponType.value === CouponsTypesType.BUY_ABOVE_SPECIFIC_PRICE
        )
          return buyAboveSprecificPriceInput.value
      })(),
    },
  })
}
if (couponStore) {
  console.log('salam')
}
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
            v-model:value="buyAboveSprecificPriceInput"
          />
        </div>
        <div
          v-if="
            selectedCouponType === CouponsTypesType.BUY_FROM_SPECIFIC_CATEGORY
          "
        >
          <div class="flex flex-col" style="max-width: 256px">
            دسته‌بندی
            <a-input
              placeholder="دسته‌بندی را انتخاب کنید"
              type="text"
              v-model:value="selectedItem.title"
              disabled
            >
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
            <a-tree
              :tree-data="categoryListData.items"
              :fieldNames="{ key: 'id' }"
              :load-data="onLoadData"
              @select="onSelectNode"
            />
            <!--  -->
          </a-modal>
        </div>
      </div>

      <div
        class="mt-4"
        v-if="selectedCouponType === CouponsTypesType.BUY_SPECIFIC_PRODUCT"
      >
        <div class="flex flex-col" style="max-width: 256px">
          محصولات
          <!-- v-model:value="inputValue" -->
          <a-input placeholder="محصولات را انتخاب کنید" type="text" disabled>
            <template #addonAfter>
              <a-button type="link" @click="openProductPickingModal">
                <template #icon>
                  <unordered-list-outlined />
                </template>
              </a-button>
            </template>
          </a-input>
        </div>
        <ul class="mt-2">
          <li v-for="item in selectedOK" :key="item.id" class="list">
            {{ item.title }}
          </li>
        </ul>

        <a-modal
          v-model:visible="showProductPickingModal"
          @ok="onProductPickerModalOkPress"
          title="انتخاب محصول"
        >
          <div v-if="productListData.items && productListData.items.length">
            <a-table
              :columns="productsSelectColumns"
              :pagination="productPagination"
              :data-source="productListData.items"
              @change="onChangeProductList"
              rowKey="id"
            >
              <!-- :row-selection="{
                onChange: onSelectChange,
                selectedRowKeys: [...selectedProductKeyInPage.keys()],
              }" -->
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'imageId'">
                  <img
                    :src="record.host + record.path + record.imageId"
                    alt=""
                    class="product-image"
                  />
                </template>
                <template v-if="column.key === 'price'">
                  {{ $filters.toPersianCurrency(record.price / 10, 'تومان') }}
                </template>
              </template>
            </a-table>
          </div>
        </a-modal>
      </div>
    </div>
  </a-card>
  <div class="line"></div>
  <div class="btn-container flex justify-end">
    <a-button type="primary" :disabled="btnDisabled" @click="nextStep">
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
.product-image {
  width: 22px;
  height: 22px;
  object-fit: cover;
  border-radius: 4px;
  margin: 0 auto;
}
.list {
  list-style: disc;
  margin-right: 16px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
}
</style>

<style lang="scss">
.ant-input[disabled] {
  background-color: #fff !important;
  opacity: 1;
  color: #000 !important;
}
.ant-input-disabled {
  background-color: #fff !important;
  color: #000 !important;
}
</style>
