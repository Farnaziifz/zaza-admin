<script lang="ts" async setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import { onBeforeMount, ref, reactive } from 'vue'
import {
  getDiscountDetails,
  chnageDiscountStatus,
  getDiscoutGroupDetails,
} from '../../../logics/specific/discount.handler'
import _ from 'lodash'
import { useRoute } from 'vue-router'
import {
  serverData,
  discountGroupData,
} from '../../../core/constants/discount.options'

const route = useRoute()
const routeId = String(route.params.id)
const visible = ref<boolean>(false)
const itemForChangeStatus = reactive({ isActive: false, id: '' })

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  serverData.value = await getDiscountDetails(routeId)
  serverData.value.promotionAssignedGroups
    ? (discountGroupData.value = await getDiscoutGroupDetails(
        serverData.value.promotionAssignedGroups,
        page,
        pageSize
      ))
    : false
})
const hideModal = () => {
  visible.value = false
}
const showModal = (item: string, isActive: boolean) => {
  visible.value = true
  itemForChangeStatus.isActive = isActive
  itemForChangeStatus.id = item
}
const onChangeStatus = async () => {
  await chnageDiscountStatus(routeId)
  serverData.value = await getDiscountDetails(routeId)
  hideModal()
}
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات کد تخفیف</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag v-if="serverData.isActive" color="green">فعال</a-tag>
        <a-tag v-else color="red">غیرفعال</a-tag>
        <a-button
          type="primary"
          size="small"
          @click="
            showModal(
              _.toString(serverData.id),
              typeof serverData.isActive === 'boolean'
                ? serverData.isActive
                : false
            )
          "
          >تغییر وضعیت</a-button
        >
      </div>
    </template>
    <template #layout-content>
      <a-card
        :body-style="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="discount-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          اطلاعات تخفیف
        </a-typography-title>
        <div class="discount-info-container mt-10">
          <div v-if="serverData.title" class="info-container">
            <div class="key">عنوان تخفیف</div>
            <div class="value">{{ serverData.title }}</div>
          </div>
          <div v-if="serverData.code" class="info-container">
            <div class="key">کد تخفیف</div>
            <div class="value">{{ serverData.code }}</div>
          </div>
          <div v-if="serverData.startAt" class="info-container">
            <div class="key">تاریخ و زمان شروع</div>
            <div class="value">
              {{ $filters.toPersianDate(_.toString(serverData.startAt)) }}
            </div>
          </div>
          <div v-if="serverData.expireAt" class="info-container">
            <div class="key">تاریخ و زمان پایان</div>
            <div class="value">
              {{ $filters.toPersianDate(_.toString(serverData.expireAt)) }}
            </div>
          </div>
        </div>
      </a-card>
      <a-card
        :body-style="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="discount-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          اطلاعات مصرف کد تخفیف
        </a-typography-title>
        <div class="discount-info-container mt-10">
          <div v-if="serverData.consumeType" class="info-container">
            <div class="key">دفعات مصرف</div>
            <div
              v-if="serverData.consumeType === 'SEVERAL_TIMES'"
              class="value"
            >
              چندبار مصرف
            </div>
            <div v-else class="value">یکبار مصرف</div>
          </div>

          <div v-if="serverData.stateType" class="info-container">
            <div class="key">مراتب تخفیف</div>
            <div v-if="serverData.stateType === 'CONSTANT'" class="value">
              ثابت
            </div>
            <div v-else class="value">پلکانی</div>
          </div>
          <div v-if="serverData.type" class="info-container">
            <div class="key">نوع تخفیف</div>
            <div v-if="serverData.type === 'CASH'" class="value">تومانی</div>
            <div v-else class="value">درصدی</div>
          </div>
          <div v-if="serverData.amount" class="info-container">
            <div class="key">مبلغ تخفیف</div>
            <div v-if="serverData.type === 'CASH'" class="value">
              {{ $filters.toPersianCurrency(serverData.amount, 'تومان') }}
            </div>
            <div v-else class="value">{{ serverData.amount }} درصد</div>
          </div>
          <div
            v-if="serverData.maximumAmount && serverData.type === 'PERCENTAGE'"
            class="info-container"
          >
            <div class="key">سقف تخفیف</div>
            <div class="value">
              {{
                $filters.toPersianCurrency(serverData.maximumAmount, 'تومان')
              }}
            </div>
          </div>
          <div
            v-if="
              serverData.consumeLimitation &&
              serverData.consumeType === 'SEVERAL_TIMES'
            "
            class="info-container"
          >
            <div class="key">محدودیت مصرف به ازای هر مشتری</div>
            <div class="value">{{ serverData.consumeLimitation }} بار</div>
          </div>
          <div
            v-if="
              serverData.stateType === 'VARIABLE' && serverData.promotionSteps
            "
            class="info-container variable-container"
          >
            <div
              v-for="item in serverData.promotionSteps"
              :key="item.order"
              class="varibale-item"
            >
              <div v-if="item.order" class="key">مرتبه {{ item.order }}</div>
              <div v-if="item.amount" class="value">
                {{ $filters.toPersianCurrency(item.amount, 'تومان') }}
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-card
        :body-style="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="discount-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          مشتریان هدف
        </a-typography-title>
        <div
          v-if="discountGroupData.items && discountGroupData.items.length"
          class="mt-10 group-container"
        >
          <div class="category-container">
            <div class="key">نام دسته‌بندی</div>
            <div
              v-for="item in discountGroupData.items"
              :key="item.groupId"
              class="value"
            >
              <span v-if="item.title">{{ item.title }}</span>
            </div>
          </div>
          <div class="customer-count-container">
            <div class="key">تعداد مشتریان</div>
            <div
              v-for="item in discountGroupData.items"
              :key="item.groupId"
              class="value"
            >
              <span v-if="item.title"> {{ item.customersCount }}</span>
            </div>
          </div>
        </div>
      </a-card>
      <a-card
        :body-style="{ 'box-shadow': '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="discount-info-card"
      >
        <a-typography-title :level="4" class="header-color">
          روش‌های ارسال
        </a-typography-title>
        <div class="discount-info-container mt-10">
          <div
            v-if="
              serverData.notificationType && serverData.notificationType.length
            "
            class="info-container"
          >
            <div class="key">روش‌های انتخاب شده</div>
            <div
              v-for="item in serverData.notificationType"
              :key="item"
              class="value"
            >
              <span v-if="item === 'SMS'">پیامک</span>
            </div>
          </div>
        </div>
      </a-card>
    </template>
  </IncentiveDetailLayout>
  <a-modal v-model:visible="visible" title="تغییر وضعیت کد تخفیف">
    <p>
      آیا از تغییر وضعیت کد تخفیف به
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
@import '../../../assets/styles/discount.scss';
</style>
