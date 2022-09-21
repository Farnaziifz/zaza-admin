<script lang="ts" setup async>
import IncentiveDetailLayout from '../layouts/IncentiveDetailLayout.vue'
import {
  getCouponDetails,
  changeCouponsStatus,
} from '../../logics/specific/coupons.handler'
import { coupons } from '../../core/types/coupons.type'
import { Ref, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'

const data: Ref<coupons> = ref({
  title: '',
  type: '',
  reward: '',
  createdAt: '',
  value: '',
  rewardValue: {},
  isActive: false,
})
const route = useRoute()
onBeforeMount(async () => {
  data.value = await getCouponDetails(route.params.id)
})
const onChangeStatus = async () => {
  await changeCouponsStatus(route.params.id)
  data.value = await getCouponDetails(route.params.id)
}
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات کوپن</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag color="green" v-if="data.isActive">فعال</a-tag>
        <a-tag color="red" v-else>غیرفعال</a-tag>
        <a-button type="primary" size="small" @click="onChangeStatus"
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
        <a-typography-title :level="3" class="header-color">
          اطلاعات کوپن
        </a-typography-title>
        <div class="coupon-info-container mt-10">
          <div class="info-container" v-if="data.title">
            <div class="key">عنوان کوپن</div>
            <div class="value">{{ data.title }}</div>
          </div>
          <div class="info-container" v-if="data.type">
            <div class="key">نوع کوپن</div>
            <div class="value">
              <span v-if="data.type === 'BUY_ABOVE_SPECIFIC_PRICE'">
                خرید بیشتر از یک مبلغ مشخص
              </span>
              <span v-if="data.type === 'BUY_FROM_SPECIFIC_CATEGORY'">
                خرید از دسته‌بندی
              </span>
              <span v-if="data.type === 'BUY_SPECIFIC_PRODUCT'">
                خرید محصولات
              </span>
              <span v-if="data.type === 'FIRST_ORDER'"> اولین خرید</span>
            </div>
          </div>
          <div
            class="info-container"
            v-if="data.type === 'BUY_SPECIFIC_PRODUCT'"
          >
            <div class="key">محصول</div>
            <div class="value">{{ data.value.title }}</div>
          </div>
          <div
            class="info-container"
            v-if="data.type === 'BUY_FROM_SPECIFIC_CATEGORY'"
          >
            <div class="key">دسته‌بندی</div>
            <div class="value">{{ data.value.title }}</div>
          </div>
          <div
            class="info-container"
            v-if="data.type === 'BUY_ABOVE_SPECIFIC_PRICE'"
          >
            <div class="key">مبلغ</div>
            <div class="value">
              {{ $filters.toPersianCurrency(data.value.amount, 'تومان') }}
            </div>
          </div>
        </div>
      </a-card>
      <a-card
        :bodyStyle="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="reward-info-card"
      >
        <a-typography-title :level="3" class="header-color">
          اطلاعات پاداش
        </a-typography-title>
        <div class="reward-info-container mt-10">
          <div class="reward-container" v-if="data.reward">
            <div class="key">نوع پاداش</div>
            <div class="value">
              <span v-if="data.reward === 'CREDIT'"> اعتبار </span>
              <span v-if="data.reward === 'FREE_SHIPPING'"> ارسال رایگان </span>
              <span v-if="data.reward === 'PRODUCT'"> جایزه محصول </span>
              <span v-if="data.reward === 'SCORE'"> امتیاز </span>
              <span v-if="data.reward === 'DISCOUNT'"> تخفیف </span>
            </div>
          </div>
          <div class="reward-container" v-if="data.rewardValue">
            <div class="key">پاداش</div>
            <div class="value" v-if="data.rewardValue">
              <span v-if="data.reward === 'SCORE'">
                {{ data.rewardValue.amount }} امتیاز</span
              >
              <span v-if="data.reward === 'CREDIT' && data.rewardValue.amount">
                {{
                  $filters.toPersianCurrency(data.rewardValue.amount, 'تومان')
                }}
              </span>
              <span v-if="data.reward === 'DISCOUNT'">
                {{ data.rewardValue.discountPercentage }} درصد</span
              >
              <span v-if="data.reward === 'PRODUCT'">{{
                data.rewardValue.title
              }}</span>
            </div>
          </div>
          <div class="reward-container" v-if="data.reward === 'DISCOUNT'">
            <div class="key">سقف قیمتی</div>
            <div class="value">
              {{
                $filters.toPersianCurrency(
                  data.rewardValue.discountMaximumPrice,
                  'تومان'
                )
              }}
            </div>
          </div>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
</template>

<style lang="scss" scoped>
.coupon-info-container {
  width: 100%;
  display: flex;
  .info-container {
    margin-left: 78px;
    .key {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      color: #6d6d6d;
    }
    .value {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin-top: 4px;
    }
  }
}
.reward-info-card {
  margin-top: 8px;
  .reward-info-container {
    display: flex;
    width: 100%;

    .reward-container {
      margin-left: 78px;
      .key {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        color: #6d6d6d;
      }
      .value {
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #000000;
        margin-top: 4px;
      }
    }
  }
}
.header-color {
  color: #1894ff !important;
}
</style>
