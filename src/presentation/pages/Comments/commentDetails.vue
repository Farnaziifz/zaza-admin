<script lang="ts" setup async>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { onBeforeMount, ref, Ref } from 'vue'
import {
  commentMainInfoRefactor,
  getCommentDetails,
} from '../../../logics/specific/comments.handler'
import { useRoute } from 'vue-router'
import { comments, detailComment } from '../../../core/types/comments.type'

const serverData: Ref<comments | undefined> = ref({
  fullName: '',
  trackingCode: '',
  createdAt: '',
  finalPrice: 0,
  products: [],
})

const commentList: Ref<detailComment[] | undefined> = ref([])
const route = useRoute()
const routeId = String(route.params.id)
const orderId = String(route.params.oId)

onBeforeMount(async () => {
  const res = await commentMainInfoRefactor(routeId, orderId)
  serverData.value = res.data
  const resCommentDetails = await getCommentDetails(routeId)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  commentList.value = resCommentDetails.data
})
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات نظر</template>
    <template #layout-content>
      <a-card
        :body-style="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
      >
        <a-typography-title :level="4" class="title"
          >جزئیات سفارش</a-typography-title
        >
        <div class="order-main-info mt-4" v-if="serverData">
          <div class="order-item">
            <div class="item">
              <div class="key">مشتری</div>
              <div class="value">
                {{ serverData.fullName }}
              </div>
            </div>
            <div class="item">
              <div class="key">شماره سفارش</div>
              <div class="value">
                {{ serverData.trackingCode }}
              </div>
            </div>
            <div class="item">
              <div class="key">زمان ثبت سفارش</div>
              <div class="value" v-if="serverData.createdAt">
                {{ $filters.toPersianDate(serverData.createdAt) }}
              </div>
            </div>
            <div class="item">
              <div class="key">مبلغ سفارش</div>
              <div class="value" v-if="serverData.finalPrice">
                {{
                  $filters.toPersianCurrency(
                    serverData.finalPrice / 10,
                    'تومان'
                  )
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="order-product">
          <div class="title-container">
            <h3 class="key">محصولات خریداری شده</h3>
          </div>
          <ul class="mt-4">
            <li
              v-for="item in serverData?.products"
              :key="item.id"
              class="product-item"
            >
              <div class="product-title">
                {{ item.title }}
              </div>
              <div class="info">
                <div class="count">{{ item.count }} عدد</div>
                <div class="price">
                  {{ $filters.toPersianCurrency(item.price / 10, 'تومان') }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </a-card>
      <a-card
        :body-style="{
          'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)',
          'margin-top': '16px',
        }"
        :bordered="false"
      >
        <a-typography-title :level="4" class="title"
          >امتیاز و متن نظر</a-typography-title
        >
        <div class="comment-list" v-if="commentList && commentList.length > 1">
          <div
            class="comment-item"
            v-for="(item, index) in commentList"
            :key="item.id"
          >
            <div class="comment-order-title flex" v-if="item.productTitle">
              <div class="coment-order-item ml-10">
                <div class="key">محصول</div>
                <div class="value">{{ item.productTitle }}</div>
              </div>
              <div class="coment-order-item">
                <div class="key">امتیاز</div>
                <div class="value">{{ item.rate }} امتیاز</div>
              </div>
            </div>
            <div class="comment-des mt-6" v-if="item.comment">
              <div class="key">متن نظر</div>
              <div class="value">
                {{ item.comment }}
              </div>
            </div>
            <div
              class="line"
              v-if="index + 1 !== commentList.length && item.productTitle"
            ></div>
          </div>
        </div>
        <div v-else>
          <div class="single-comment">
            <div class="single-item" v-for="item in commentList" :key="item.id">
              <div class="key">امتیاز</div>
              <div class="value">{{ item.rate }} امتیاز</div>

              <div class="key mt-4">متن نظر</div>
              <div class="value">{{ item.comment }}</div>
            </div>
          </div>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
</template>

<style lang="scss" scoped>
.title {
  color: #1894ff;
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
.order-main-info {
  .order-item {
    display: flex;
    margin-bottom: 24px;
    flex-wrap: wrap;
    .item {
      margin-left: 56px;
    }
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
  margin-bottom: 16px;
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
.line {
  margin: 24px 0;
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
}
</style>
