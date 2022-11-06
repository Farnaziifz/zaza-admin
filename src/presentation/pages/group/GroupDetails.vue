<script lang="ts" setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import CardCollapse from '/src/presentation/components/shared/Organisms/CardCollapse.vue'
import { onBeforeMount, Ref, ref, reactive, computed } from 'vue'
import {
  getGroupDetails,
  groupStatus,
} from '../../../logics/specific/group.handler'
import { getTargetCustomerList } from '../../../logics/specific/reportDiscountList.handler'
import { groups } from '../../../core/types/group.type'
import {
  groupCustomerItem,
  customerGroup,
} from '../../../core/types/customer.type'
import { useRoute } from 'vue-router'
import { TableColumnType, TableProps } from 'ant-design-vue'
import _ from 'lodash'

type customerGroupList = {
  items: groupCustomerItem[]
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  totalCount: number
  totalPages: number
}
const groupId = useRoute().params.id as string
const serverData: Ref<groups | undefined> = ref(undefined)
const itemForChangeStatus = reactive({ isActive: false, id: '' })
const visible = ref<boolean>(false)
const customerData: Ref<customerGroupList | undefined> = ref(undefined)
const columns: TableColumnType<customerGroup | undefined>[] = [
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

onBeforeMount(async () => {
  serverData.value = await getGroupDetails(groupId)
  const customerRes = await getTargetCustomerList([groupId], 1)
  customerData.value = customerRes.data
  if (serverData.value?.from && serverData.value.to) {
    serverData.value?.queries?.unshift({
      type: 'TIME_RAGE',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      from: serverData.value?.from,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      to: serverData.value?.to,
    })
  }
})
const openStatusModal = () => {
  visible.value = true
  itemForChangeStatus.isActive = serverData.value?.isActive
    ? serverData.value?.isActive
    : false
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  itemForChangeStatus.id = serverData.value?.id ? serverData.value?.id : ''
}
const changeGroupStatus = async () => {
  await groupStatus(groupId)
  serverData.value = await getGroupDetails(groupId)

  visible.value = false
}
const hideModal = () => {
  visible.value = false
}

const pagination = computed(() => ({
  total: customerData.value?.totalCount,
  current: customerData.value?.page,
  pageSize: 10,
}))
const onChange: TableProps<customerGroupList>['onChange'] = async (
  paginate
) => {
  const res = await getTargetCustomerList(
    [groupId],
    _.toNumber(paginate.current)
  )
  customerData.value = res.data
}
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات دسته‌بندی {{ serverData?.title }}</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag color="green" v-if="serverData?.isActive">فعال</a-tag>
        <a-tag color="red" v-else>غیرفعال</a-tag>
        <a-button type="primary" size="small" @click="openStatusModal"
          >تغییر وضعیت</a-button
        >
      </div>
    </template>
    <template #layout-content>
      <CardCollapse title="مشوق های وابسته">
        <template #body>
          <ul
            class="incentivce-container"
            v-if="
              serverData?.creditAssignedGroups.length ||
              serverData?.promotionAssignedGroups.length
            "
          >
            <li
              v-for="credit in serverData?.creditAssignedGroups"
              :key="credit.amount"
            >
              هدیه اعتباری
              {{ $filters.toPersianCurrency(credit.amount, 'تومانی') }}
            </li>
            <li
              v-for="discount in serverData?.promotionAssignedGroups"
              :key="discount.amount"
            >
              <span v-if="discount.unit === 'CASH'"
                >کد تخفیف
                {{
                  $filters.toPersianCurrency(discount.amount, 'تومانی')
                }}</span
              >
              <span v-else>کد تخفیف {{ discount.amount }} درصدی</span>
            </li>
          </ul>
          <p v-else>مشوق وابسته‌ای وجود ندارد</p>
        </template>
      </CardCollapse>
      <CardCollapse title="فیلتر های انتخاب شده" class="card-filter">
        <template #body>
          <div
            class="filter-item-container flex flex-wrap"
            v-if="serverData?.queries?.length"
          >
            <div
              class="filter-item"
              v-for="(item, index) in serverData?.queries"
              :key="index"
            >
              <ul class="key-list">
                <li>
                  <div class="key">
                    <span v-if="item.type === 'TIME_RAGE'"
                      >بازه زمانی انتخاب شده</span
                    >
                  </div>
                  <div class="key">
                    <span v-if="item.type === 'BUSINESS_CLASSIFICATION'"
                      >طبقه‌بندی تجاری</span
                    >
                    <span v-if="item.type === 'PURCHASED_PRODUCT_RANGE'"
                      >بازه دلخواه تعداد محصولات خریداری شده</span
                    >
                    <span v-if="item.type === 'NUMBER_OF_FAILED_PAYMENT'"
                      >بازه دلخواه تعداد پرداخت ناموفق‌ها</span
                    >
                    <span v-if="item.type === 'HAS_FEEDBACK'">نظر ثبت شده</span>
                    <span v-if="item.type === 'PAYMENT_AVERAGE'"
                      >بازه دلخواه میزان پول پرداختی</span
                    >
                    <span v-if="item.type === 'ORDER_RANGE'"
                      >بازه دلخواه تعداد دفعات ثبت سفارش</span
                    >
                    <span v-if="item.type === 'SATISFACTION_LABEL'"
                      >برچسب رضایتمندی</span
                    >
                    <span v-if="item.type === 'BADGE_LABEL'">برچسب پویایی</span>
                    <span v-if="item.type === 'PAID_MONEY_RANGE'"
                      >بازه دلخواه میزان پول پرداختی</span
                    >
                    <span v-if="item.type === 'PRODUCTS_IN_BASKET_AVERAGE'"
                      >بازه دلخواه میانگین تعداد محصولات خریداری شده در هر
                      سفارش</span
                    >
                  </div>
                </li>
              </ul>
              <div class="value">
                <span v-if="item.type === 'TIME_RAGE'">
                  <!-- {{ item }} -->
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ $filters.toPersianDate(_.toString(item.from)) }}
                  </span>
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ $filters.toPersianDate(_.toString(item.to)) }}
                  </span>
                </span>
                <span v-if="item.value === 'CHURN'">از دست رفته</span>
                <span v-if="item.value === 'LAZY'">خواب آلود</span>
                <span v-if="item.value === 'NORMAL'">عادی</span>
                <span v-if="item.value === 'HERO'">قهرمان</span>
                <span v-if="item.value === 'LOYAL'">وفادار</span>
                <span v-if="item.value === 'ATTENTION_NEED'">نیازمند توجه</span>
                <span v-if="item.type === 'PURCHASED_PRODUCT_RANGE'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ item.from }} محصول</span
                  >
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ item.to }} محصول</span
                  >
                </span>
                <span v-if="item.type === 'NUMBER_OF_FAILED_PAYMENT'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ item.from }} پرداخت</span
                  >
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ item.to }} پرداخت</span
                  >
                </span>
                <span v-if="item.type === 'HAS_FEEDBACK'">
                  <span v-if="item.value">دارد</span>
                  <span v-else>ندارد</span>
                </span>
                <span v-if="item.type === 'PAYMENT_AVERAGE'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored">{{
                    $filters.toPersianCurrency(item.from / 10, 'تومان')
                  }}</span>
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ $filters.toPersianCurrency(item.to / 10, 'تومان') }}
                  </span>
                </span>
                <span v-if="item.type === 'ORDER_RANGE'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ item.from }} سفارش</span
                  >
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ item.to }} سفارش</span
                  >
                </span>
                <span v-if="item.type === 'SATISFACTION_LABEL'">
                  <span v-if="item.value === 'HAPPY'">خوشحال</span>
                  <span v-if="item.value === 'UN_HAPPY'">ناراضی</span>
                  <span v-if="item.value === 'NEUTRAL'">خنثی</span>
                </span>
                <span v-if="item.type === 'BADGE_LABEL'">
                  <span v-if="item.value === 'SILVER'">نقره‌ای</span>
                  <span v-if="item.value === 'BRONZE'">برنزی</span>
                  <span v-if="item.value === 'GOLD'">طلایی</span>
                </span>
                <span v-if="item.type === 'PAID_MONEY_RANGE'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ $filters.toPersianCurrency(item.from / 10, 'تومان') }}
                  </span>
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{
                      $filters.toPersianCurrency(item.to / 10, 'تومان')
                    }}
                    سفارش</span
                  >
                </span>
                <span v-if="item.type === 'PRODUCTS_IN_BASKET_AVERAGE'">
                  <span v-if="item.from">از</span>
                  <span v-if="item.from" class="colored"
                    >{{ item.from }} زیرمحصول</span
                  >
                  <span v-if="item.to"> تا </span>
                  <span v-if="item.to" class="colored"
                    >{{ item.to }} زیرمحصول</span
                  >
                </span>
              </div>
            </div>
          </div>
          <p v-else>فیلتر انتخاب شده‌ای وجود ندارد</p>
        </template>
      </CardCollapse>
      <a-card
        class="card-table"
        :body-style="{
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          marginTop: '16px',
        }"
        :bordered="false"
      >
        <div>
          <span style="font-weight: 700; font-size: 20px">
            مشتریان این دسته بندی
          </span>
        </div>
        <a-table
          :columns="columns"
          :data-source="customerData?.items"
          :pagination="pagination"
          @change="onChange"
        >
        </a-table>
      </a-card>

      <a-modal v-model:visible="visible" title="تغییر وضعیت دسته‌بندی">
        {{ itemForChangeStatus.isActive }}
        <p>
          آیا از تغییر وضعیت دسته‌بندی به
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
            @click="changeGroupStatus"
            >فعال</a-button
          >
          <a-button v-else type="primary" @click="changeGroupStatus"
            >غیرفعال</a-button
          >
        </template>
      </a-modal>
    </template>
  </IncentiveDetailLayout>
</template>

<style lang="scss" scoped>
.card-filter {
  margin-top: 20px;
  .filter-item {
    width: 25%;
    margin-bottom: 32px;
    .key {
      span {
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        color: #363636;
      }
    }
    .value {
      span {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: #363636;
      }
    }
  }
}
.key-list {
  li {
    list-style: disc;
  }
}

.colored {
  color: #1894ff !important;
  margin: 0 4px;
}
.incentivce-container {
  margin-right: 16px;
  li {
    margin-bottom: 24px;
    list-style: disc;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #363636;
  }
}
</style>
