<script setup lang="ts">
import { ref, computed, Ref } from 'vue'
import { CouponsRewardsType } from '../../../core/enums/couponsType.enum'
import { t } from 'vui18n'
import { productsList, products } from '../../../core/types/product.type'
import { getProductList } from '../../../logics/specific/products.handler'

import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import InputWithHeadlineAndUnit from '/src/presentation/components/shared/molecules/InputWithHeadlineAndUnit.vue'
import { UnorderedListOutlined } from '@ant-design/icons-vue'
import { TableProps } from 'ant-design-vue'

import {
  productsSelectColumns,
  productListData,
} from '../../../core/constants/coupons.options'

const selectedCouponReward = ref('')
const couponRewardOptions: any[] = []
const selectedProductInModal: Ref<products> = ref({
  id: '',
  title: '',
  price: 0,
  discount: 0,
  host: '',
  path: '',
  imageId: '',
  isActive: false,
})

for (const type in CouponsRewardsType)
  couponRewardOptions.push({
    value: type,
    label: t(`types.couponRewardEnum.${type}`),
  })

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
const productPagination = computed(() => ({
  total: productListData.value.totalCount,
  current: productListData.value.page,
  pageSize: 5,
}))

const onChangeProductList: TableProps<productsList>['onChange'] = async (
  paginate
) => {
  productListData.value = await getProductList(
    paginate.current,
    paginate.pageSize
  )
}

const selectProduct = (item: object) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  selectedProductInModal.value.id === item.id
    ? (selectedProductInModal.value = {
        id: '',
        title: '',
        price: 0,
        discount: 0,
        host: '',
        path: '',
        imageId: '',
        isActive: false,
      })
    : // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      (selectedProductInModal.value = item)
}

const confirmModal = () => {
  showProductPickingModal.value = false
}
</script>

<template>
  <a-card style="margin: 8px 0; background-color: #f6f6f6">
    <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
      اطلاعات پاداش
    </h3>
    <div class="flex items-center">
      <div class="mx-4">
        <div>نوع کوپن</div>
        <BSelect
          v-model:value="selectedCouponReward"
          placeholder="نوع پاداش را انتخاب کنبد"
          :options="couponRewardOptions"
          style="width: 280px"
        />
      </div>
      <div v-if="selectedCouponReward === 'PRODUCT'">
        <div class="flex flex-col" style="max-width: 256px">
          محصول
          <a-input
            placeholder="محصول را انتخاب کنید"
            type="text"
            disabled
            v-model:value="selectedProductInModal.title"
          >
            <template #addonAfter>
              <a-button type="link" @click="openProductPickingModal">
                <template #icon>
                  <unordered-list-outlined />
                </template>
              </a-button>
            </template>
          </a-input>
        </div>

        <a-modal
          v-model:visible="showProductPickingModal"
          title="انتخاب محصول"
          @ok="confirmModal"
          ok-text="افزودن"
        >
          <a-table
            :columns="productsSelectColumns"
            :pagination="productPagination"
            :data-source="productListData.items"
            @change="onChangeProductList"
          >
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
              <template v-if="column.key === 'actions'">
                <a-button
                  type="primary"
                  :id="record.id"
                  @click="selectProduct(record)"
                  v-if="selectedProductInModal.id"
                  :disabled="record.id !== selectedProductInModal.id"
                >
                  <span>انتخاب</span>
                </a-button>
                <a-button
                  type="primary"
                  :id="record.id"
                  @click="selectProduct(record)"
                  v-else
                >
                  <span>انتخاب</span>
                </a-button>
              </template>
            </template>
          </a-table>
        </a-modal>
      </div>
      <div
        v-if="selectedCouponReward === 'DISCOUNT'"
        class="mx-4 flex items-center"
      >
        <InputWithHeadlineAndUnit
          unit="درصد"
          placeholder="درصد تخفیف را وارد کنید"
          headline="درصد تخفیف"
        />
        <InputWithHeadlineAndUnit
          class="mr-4"
          unit="تومان"
          placeholder="سقف قیمتی را وارد کنید"
          headline="سقف قیمتی"
        />
      </div>
      <div v-if="selectedCouponReward === 'SCORE'" class="mx-4">
        <InputWithHeadlineAndUnit
          unit="امتیاز"
          placeholder="مقدار امتیاز را وارد کنید"
          headline="مقدار امتیاز"
        />
      </div>
      <div v-if="selectedCouponReward === 'CREDIT'" class="mx-4">
        <InputWithHeadlineAndUnit
          unit="اعتبار"
          placeholder="مقدار اعتبار را وارد کنید"
          headline="مقدار اعتبار"
        />
      </div>
    </div>
  </a-card>
  <div class="line"></div>
  <div class="btn-container flex justify-end">
    <a-button type="primary">
      <span>مرحله قبل</span>
    </a-button>
    <a-button type="primary">
      <span>ثبت</span>
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
