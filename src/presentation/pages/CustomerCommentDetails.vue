<script lang="ts" setup async>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import {
  getCustomerCommentDetails,
  getCustomerCommentOrderDetails,
} from '../../logics/specific/customrtList.handler'
import { Ref, ref, onBeforeMount } from 'vue'
import {
  customerCommentDetailsList,
  customerOrderDetails,
} from '../../core/types/customer.type'
import { useRoute } from 'vue-router'

const commentData: Ref<customerCommentDetailsList> = ref([])
const commnetOrderData: Ref<customerOrderDetails> = ref({
  createdAt: '',
  finalPrice: 0,
  trackingCode: '',
  products: [],
})
const route = useRoute()
const cId = String(route.params.cId)
const fId = String(route.params.fId)
const oId = String(route.params.oId)
const orderName = String(route.params.orderName)

onBeforeMount(async () => {
  commentData.value = await getCustomerCommentDetails(cId, fId)
  commnetOrderData.value = await getCustomerCommentOrderDetails(cId, oId)
})
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>سفارش {{ orderName }}</template>
    <template #layout-content v-if="commentData && commentData.length">
      <div class="comment-container" v-for="item in commentData" :key="item.id">
        <div class="title-container">
          <h3 v-if="commentData[0]">امتیاز و متن نظر</h3>
          <p class="date">{{ $filters.toPersianDate(item.createdAt) }}</p>
        </div>
        <div class="rate">
          <p class="key">امتیاز</p>
          <p class="value">{{ item.rate }} امتیاز</p>
        </div>
        <div class="comment">
          <div class="key">متن نظر</div>
          <div class="value">
            {{ item.comment }}
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="title-container">
        <h3>جزئیات سفارش</h3>
      </div>
      <div class="order-item">
        <div class="item">
          <div class="key">زمان ثبت سفارش</div>
          <div class="value">
            {{ $filters.toPersianDate(commnetOrderData.createdAt) }}
          </div>
        </div>
        <div class="item">
          <div class="key">مبلغ سفارش</div>
          <div class="value">
            {{
              $filters.toPersianCurrency(commnetOrderData.finalPrice, 'تومان')
            }}
          </div>
        </div>
      </div>
      <div class="order-product">
        <div class="title-container">
          <h3>محصولات خریداری شده</h3>
        </div>
        <ul>
          <li class="product-item">
            <div class="title">
              چلو جوجه ران ( سماق 1عدد، قاشق چنگال 1 عدد )
            </div>
            <div class="info">
              <div class="count">2 عدد</div>
              <div class="price">250,000 تومان</div>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </IncentiveDetailLayout>
</template>

<style lang="scss" scoped>
.title-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  h3 {
    color: #1894ff;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    color: #bfbfbf;
  }
}
.rate,
.comment {
  width: 100%;
  margin-top: 8px;
}
.key {
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #6d6d6d;
}
.value {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin-top: 4px;
  color: #000000;
  line-height: 34px;
  text-align: justify;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #ebebeb;
  margin: 24px 0;
}
.order-item {
  display: flex;
  margin-bottom: 24px;
  .item {
    margin-left: 56px;
  }
}
.product-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
  position: relative;
  margin-right: 16px;
  &::before {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    right: -16px;
    top: 50%;
    transform: translateY(-50%);
  }
  .info {
    display: flex;
  }
  .count {
    margin-left: 40px;
  }
}

.comment-container {
  margin-bottom: 32px;
}
</style>
