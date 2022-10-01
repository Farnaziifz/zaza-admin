<script lang="ts" setup async>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import {
  getCouponDetails,
  changeCouponsStatus,
} from '../../logics/specific/coupons.handler'
import { coupons } from '../../core/types/coupons.type'
import { Ref, ref, onBeforeMount, reactive } from 'vue'
import { useRoute } from 'vue-router'

const serverData: Ref<coupons> = ref({
  title: '',
  type: '',
  reward: '',
  createdAt: '',
  value: {
    title: '',
    amount: 0,
  },
  rewardValue: {
    amount: 0,
    title: '',
    discountMaximumPrice: 0,
    discountPercentage: 0,
  },
  isActive: false,
})
const route = useRoute()
const routeId = String(route.params.id)
const visible = ref<boolean>(false)
const itemForChangeStatus = reactive({ isActive: false, id: '' })
onBeforeMount(async () => {
  serverData.value = await getCouponDetails(routeId)
})

const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const onChangeStatus = async () => {
  await changeCouponsStatus(routeId)
  serverData.value = await getCouponDetails(routeId)
  hideModal()
}
const hideModal = () => {
  visible.value = false
}
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات کوپن</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag v-if="serverData.isActive" color="green">فعال</a-tag>
        <a-tag v-else color="red">غیرفعال</a-tag>
        <a-button
          type="primary"
          size="small"
          @click="showModal(serverData.id, serverData.isActive)"
          >تغییر وضعیت</a-button
        >
      </div>
    </template>
    <template #layout-content>
      <a-card
        :bodyStyle="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="coupon-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          اطلاعات کوپن
        </a-typography-title>
        <div class="coupon-info-container mt-10">
          <div v-if="serverData.title" class="info-container">
            <div class="key">عنوان کوپن</div>
            <div class="value">{{ serverData.title }}</div>
          </div>
          <div v-if="serverData.type" class="info-container">
            <div class="key">نوع کوپن</div>
            <div class="value">
              <span v-if="serverData.type === 'BUY_ABOVE_SPECIFIC_PRICE'">
                خرید بیشتر از یک مبلغ مشخص
              </span>
              <span v-if="serverData.type === 'BUY_FROM_SPECIFIC_CATEGORY'">
                خرید از دسته‌بندی
              </span>
              <span v-if="serverData.type === 'BUY_SPECIFIC_PRODUCT'">
                خرید محصولات
              </span>
              <span v-if="serverData.type === 'FIRST_ORDER'"> اولین خرید</span>
            </div>
          </div>
          <div
            v-if="serverData.type === 'BUY_SPECIFIC_PRODUCT'"
            class="info-container"
          >
            <div class="key">محصول</div>

            <div
              v-if="serverData.value && serverData.value.title"
              class="value"
            >
              {{ serverData.value.title }}
            </div>
          </div>
          <div
            v-if="serverData.type === 'BUY_FROM_SPECIFIC_CATEGORY'"
            class="info-container"
          >
            <div class="key">دسته‌بندی</div>
            <div
              v-if="serverData.value && serverData.value.title"
              class="value"
            >
              {{ serverData.value.title }}
            </div>
          </div>
          <div
            v-if="serverData.type === 'BUY_ABOVE_SPECIFIC_PRICE'"
            class="info-container"
          >
            <div class="key">مبلغ</div>
            <div
              v-if="serverData.value && serverData.value.amount"
              class="value"
            >
              {{ $filters.toPersianCurrency(serverData.value.amount, 'تومان') }}
            </div>
          </div>
        </div>
      </a-card>
      <a-card
        :bodyStyle="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="reward-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          اطلاعات پاداش
        </a-typography-title>
        <div class="reward-info-container mt-10">
          <div v-if="serverData.reward" class="reward-container">
            <div class="key">نوع پاداش</div>
            <div class="value">
              <span v-if="serverData.reward === 'CREDIT'"> اعتبار </span>
              <span v-if="serverData.reward === 'FREE_SHIPPING'">
                ارسال رایگان
              </span>
              <span v-if="serverData.reward === 'PRODUCT'"> جایزه محصول </span>
              <span v-if="serverData.reward === 'SCORE'"> امتیاز </span>
              <span v-if="serverData.reward === 'DISCOUNT'"> تخفیف </span>
            </div>
          </div>
          <div v-if="serverData.rewardValue" class="reward-container">
            <div class="key">پاداش</div>
            <div v-if="serverData.rewardValue" class="value">
              <span v-if="serverData.reward === 'SCORE'">
                {{ serverData.rewardValue.amount }} امتیاز</span
              >
              <span
                v-if="
                  serverData.reward === 'CREDIT' &&
                  serverData.rewardValue.amount
                "
              >
                {{
                  $filters.toPersianCurrency(
                    serverData.rewardValue.amount,
                    'تومان'
                  )
                }}
              </span>
              <span v-if="serverData.reward === 'DISCOUNT'">
                {{ serverData.rewardValue.discountPercentage }} درصد</span
              >
              <span v-if="serverData.reward === 'PRODUCT'">{{
                serverData.rewardValue.title
              }}</span>
            </div>
          </div>
          <div v-if="serverData.reward === 'DISCOUNT'" class="reward-container">
            <div class="key">سقف قیمتی</div>
            <div
              v-if="
                serverData.rewardValue &&
                serverData.rewardValue.discountMaximumPrice
              "
              class="value"
            >
              {{
                $filters.toPersianCurrency(
                  serverData.rewardValue.discountMaximumPrice,
                  'تومان'
                )
              }}
            </div>
          </div>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
  <a-modal v-model:visible="visible" title="تغییر وضعیت کوپن">
    <p>
      آیا از تغییر وضعیت کوپن به
      <a-typography-text v-if="!itemForChangeStatus.isActive" type="success"
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
        @click="onChangeStatus"
        >فعال</a-button
      >
      <a-button v-else type="primary" @click="onChangeStatus">غیرفعال</a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
@import '../../assets/styles/couponDetails.scss';
</style>
