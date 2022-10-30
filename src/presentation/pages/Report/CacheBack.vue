<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '@/presentation/layouts/EmptyLayout.vue'
import { getReportCachbackStatisticOverall } from '../../../logics/specific/reportCachback.handler'
import { onBeforeMount, Ref, ref, computed } from 'vue'
import { cashbackStatics } from '../../../core/types/cashback.type'
import { getCashbackCustomer } from '../../../logics/specific/cashback.handler'
import { TableColumnType } from 'ant-design-vue'
import { discountCustomerGroup } from '@/core/types/discounts.type'
import { customerData } from '../../../core/constants/discount.options'
import { TableProps } from 'ant-design-vue'
import _ from 'lodash'
const cachbackStatistic: Ref<cashbackStatics | undefined> = ref(undefined)
const visibleReciverModal = ref<boolean>(false)
const customerGroupColumns: TableColumnType<discountCustomerGroup>[] = [
  {
    title: 'نام مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره همراه',
    key: 'mobileNumber',
    dataIndex: 'mobileNumber',
  },
]
const activeModalItem = ref('')
onBeforeMount(async () => {
  const staticRes = await getReportCachbackStatisticOverall()
  cachbackStatistic.value = staticRes.data
})
const handleRceiveCancel = () => {
  visibleReciverModal.value = false
}
const openModal = async (type: string) => {
  visibleReciverModal.value = true
  const res = await getCashbackCustomer(type, 1)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  customerData.value = res.data
  activeModalItem.value = type
}
const customerpagination = computed(() => ({
  total: customerData.value.totalCount,
  current: customerData.value.page,
  pageSize: 10,
}))
const onChangeCustomerGroup: TableProps<discountCustomerGroup>['onChange'] =
  async (paginate) => {
    const res = await getCashbackCustomer(
      activeModalItem.value,
      _.toNumber(paginate.current)
    )
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    customerData.value = res.data
  }
</script>
<template>
  <ContentLayout>
    <template #content-title>
      <span style="font-weight: 700; font-size: 24px"> گزارش کش بک </span>
    </template>
    <template v-if="cachbackStatistic" #content-body>
      <a-card
        :body-style="{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          height: '450px',
        }"
        :bordered="false"
        class="coupon-info-card"
      >
        chart section
      </a-card>
      <div class="statics-section mt-4 flex">
        <a-card
          :body-style="{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            marginLeft: '8px',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="5" class="text-center"
            >تعداد مشتریان دریافت کننده کش ‌بک</a-typography-title
          >
          <a-typography-title
            :level="3"
            class="text-center mt-6 header-color cursor-pointer"
            @click="openModal('RECEIVER')"
            >{{
              cachbackStatistic?.customerCashbackCount
            }}
            نفر</a-typography-title
          >
        </a-card>
        <a-card
          :body-style="{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            margin: '0 8px',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="5" class="text-center"
            >تعداد نفرات استفاده‌کننده از کش‌بک
          </a-typography-title>
          <a-typography-title
            :level="3"
            class="text-center mt-6 header-color cursor-pointer"
            @click="openModal('USED')"
            >{{
              cachbackStatistic?.customerUsedCashbackCount
            }}
            نفر</a-typography-title
          >
        </a-card>
        <a-card
          :body-style="{
            margin: '0 8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="5" class="text-center"
            >نرخ موفقیت کش‌بک</a-typography-title
          >
          <a-typography-title :level="3" class="text-center mt-6"
            >{{ cachbackStatistic?.successRate }}درصد
          </a-typography-title>
        </a-card>
        <a-card
          :body-style="{
            margin: '0 8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="5" class="text-center"
            >درآمد</a-typography-title
          >
          <a-typography-title
            :level="3"
            class="text-center mt-6"
            v-if="cachbackStatistic"
            >{{ $filters.toPersianCurrency(cachbackStatistic.income, 'تومان') }}
          </a-typography-title>
        </a-card>
        <a-card
          :body-style="{
            marginRight: '8px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="5" class="text-center"
            >هزینه</a-typography-title
          >
          <a-typography-title
            :level="3"
            class="text-center mt-6"
            v-if="cachbackStatistic"
            >{{
              $filters.toPersianCurrency(cachbackStatistic.cost / 10, 'تومان')
            }}
          </a-typography-title>
        </a-card>
      </div>
      <div class="global-info-container mt-4">
        <a-card
          :body-style="{
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }"
          :bordered="false"
          class="cach-info-card"
        >
          <a-typography-title :level="4" class="header-color"
            >اطلاعات کش‌بک
          </a-typography-title>
          <div class="cach-info-items flex justify-between">
            <div class="item">
              <div class="key">نوع کش‌بک</div>
              <div class="value">
                <span v-if="cachbackStatistic?.type === 'PRICE'">تومانی</span>
                <span v-else>درصدی</span>
              </div>
            </div>
            <div class="item">
              <div class="key">مقدار کش‌بک</div>
              <div class="value" v-if="cachbackStatistic">
                {{
                  $filters.toPersianCurrency(
                    cachbackStatistic?.amount / 10,
                    'تومان'
                  )
                }}
              </div>
            </div>
            <div class="item">
              <div class="key">حداقل مبلغ برای دریافت کش‌بک</div>
              <div class="value" v-if="cachbackStatistic">
                {{
                  $filters.toPersianCurrency(
                    cachbackStatistic?.minimumAmount / 10,
                    'تومان'
                  )
                }}
              </div>
            </div>
            <div class="item">
              <div class="key">مدت</div>
              <div class="value" v-if="cachbackStatistic">
                <span v-if="cachbackStatistic.hasDuration">دارد</span>
                <span v-else>ندارد</span>
              </div>
            </div>
          </div>
        </a-card>
      </div>
      <a-modal
        v-model:visible="visibleReciverModal"
        :title="
          activeModalItem == 'RECEIVER'
            ? 'مشتریان دریافت کننده کش‌بک'
            : 'مشتریان استفاده کننده از کش‌بک'
        "
      >
        <template #footer>
          <a-button key="back" @click="handleRceiveCancel">بستن</a-button>
        </template>
        <a-table
          :columns="customerGroupColumns"
          :pagination="customerpagination"
          :data-source="customerData.items"
          @change="onChangeCustomerGroup"
        >
        </a-table>
      </a-modal>
    </template>
    <template v-else #content-body>
      <empty-layout>
        <template #empty-text>
          متاسفانه داده‌ای برای نمایش گزارش کش بک شما وجود ندارد.
        </template>
        <template #empty-action>
          <a-button
            class="button-secondary"
            type="primary"
            block
            @click="goToPath('/cashback')"
          >
            ساخت کش‌بک
          </a-button>
        </template>
      </empty-layout>
    </template>
  </ContentLayout>
</template>

<style lang="scss" scoped>
.cach-info-card {
  width: 100%;
}
.header-color {
  color: #1894ff !important;
}
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
  margin: 16px 0;
}
.item {
  width: 100%;
}
</style>
