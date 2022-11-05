<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import { ref } from 'vue'
import { newDiscountAdd } from '../../../logics/specific/discount.handler'
import { useDiscountStore } from '../../../resources/store/discount.store'
import { convertDateTimeFromPersianToGeorgian } from '@/logics/shared/date.handler'

const discountStore = useDiscountStore()
const notificationWay = ref()
const optionNotificationGroup = [
  { label: 'پیامک', value: 'SMS' },
  { label: 'ایمیل ( به زودی )', value: 'EMAIL', disabled: true },
  { label: ' پوش ناتفیکیشن (به زودی)', value: 'PUSH', disabled: true },
  { label: ' واتس اپ (به زودی)', value: 'WA', disabled: true },
]

const setSelectedNotification = (value: string[]) => {
  discountStore.notificationType = value
}

const onSubmitDiscountCode = async () => {
  const filterdSelectedGroups = discountStore.promotionAssignedGroups?.map(
    (el) => {
      return { groupId: el.groupId }
    }
  )

  const data = {
    title: discountStore.title,
    code: discountStore.code,
    consumeType: discountStore.consumeType,
    stateType: discountStore.stateType,
    type: discountStore.type,
    amount: discountStore.amount,
    minimumAmount: discountStore.minimumAmount,
    maximumAmount: discountStore.maximumAmount,
    consumeLimitation: discountStore.consumeLimitation,
    promotionSteps: discountStore.promotionSteps,
    promotionAssignedGroups: filterdSelectedGroups,
    notificationType: discountStore.notificationType,
  }
  if (discountStore.startAt)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.startAt = convertDateTimeFromPersianToGeorgian(
      discountStore.startAt.toString()
    )
  if (discountStore.expireAt)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.expireAt = convertDateTimeFromPersianToGeorgian(
      discountStore.expireAt.toString()
    )
  await newDiscountAdd(data)
  discountStore.emptyDiscountStore()
}
</script>

<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: 'انتخاب روش ارسال',
            description:
              'شما می‌توانید کد تخفیف را به صورت پیامک، ایمیل، پوش ناتیفیکیشن برای کاربران خود راسال کنید.',
          },
        ]"
      />
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <h3 style="font-weight: 700; font-size: 20px; line-height: 24px">
          روش ارسال
        </h3>
        <a-checkbox-group
          v-model:value="notificationWay"
          style="width: 100%"
          name="notificationGroup"
          :options="optionNotificationGroup"
          @change="setSelectedNotification"
        >
        </a-checkbox-group>
      </a-card>
      <div class="line"></div>
      <div class="btn-container flex justify-end">
        <a-button class="ml-4">
          <span>مرحله قبل</span>
        </a-button>
        <a-button
          type="primary"
          class="button-secondary"
          @click="onSubmitDiscountCode"
        >
          <span>ثبت</span>
        </a-button>
      </div>
    </template>
  </content-layout>
</template>
<style lang="scss" scoped>
.line {
  width: 100%;
  height: 1px;
  background-color: #e2e2e2;
  margin: 32px 0;
}
</style>
