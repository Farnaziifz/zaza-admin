<script lang="ts" setup>
import BadgeComponent from '/src/presentation/components/shared/Organisms/Badge.vue'
const props = defineProps({
  profileData: {
    type: Object,
  },
})
</script>
<template>
  <a-card
    :bodyStyle="{ 'box-shadow': '0px 4px 10px rgba(0, 0, 0, 0.1)' }"
    :bordered="false"
    class="info-info-card"
    v-if="props.profileData"
  >
    <a-typography-title :level="4">اطلاعات مشتری</a-typography-title>
    <div class="row-container">
      <div class="item">
        <div class="key">نام ونام خانوادگی</div>
        <div class="value">{{ props.profileData.fullName }}</div>
      </div>
      <div class="item">
        <div class="key">شماره تماس</div>
        <div class="value">{{ props.profileData.mobileNumber }}</div>
      </div>
      <div class="item">
        <div class="key">تاریخ عضویت</div>
        <div class="value">
          {{ $filters.toPersianDate(props.profileData.createdAt) }}
        </div>
      </div>
      <div class="item">
        <div class="key">برچسب</div>
        <div class="value">
          <span>
            <a-tag
              v-if="props.profileData.orderLabel === 'HAPPY'"
              color="green"
            >
              راضی</a-tag
            >
            <a-tag
              v-if="props.profileData.orderLabel === 'UN_HAPPY'"
              color="red"
            >
              ناراضی</a-tag
            >
            <a-tag
              v-if="props.profileData.orderLabel === 'NEUTRAL'"
              color="default"
            >
              خنثی</a-tag
            >
          </span>
          <span>
            <a-tag
              v-if="props.profileData.degreeLabel === 'GOLD'"
              color="warning"
            >
              طلایی</a-tag
            >
            <a-tag
              v-if="props.profileData.degreeLabel === 'SILVER'"
              color="default"
            >
              نقره‌ای</a-tag
            >

            <BadgeComponent
              v-if="props.profileData.degreeLabel === 'BRONZE'"
              color="#E6BF98"
              background="#F5E5D6"
              >برنزی</BadgeComponent
            >
          </span>
        </div>
      </div>
      <div class="item">
        <div class="key">ایمیل</div>
        <div class="value">{{ props.profileData.emailAddress }}</div>
      </div>
    </div>
    <div class="row-container">
      <div class="item" v-if="props.profileData.dateOfFirstOrder">
        <div class="key">تاریخ اولین ثبت سفارش</div>
        <div class="value">
          {{ $filters.toPersianDate(props.profileData.dateOfFirstOrder) }}
        </div>
      </div>
      <div
        class="item"
        v-if="
          props.profileData.dateOfFirstOrder &&
          props.profileData.dateOfLastOrder
        "
      >
        <div class="key">تاریخ آخرین سفارش</div>
        <div class="value">
          {{ $filters.toPersianDate(props.profileData.dateOfLastOrder) }}
        </div>
      </div>
    </div>
    <div
      class="row-container"
      v-if="
        props.profileData.customerAddresses &&
        props.profileData.customerAddresses.length
      "
    >
      <div class="item">
        <div class="key">آدرس‌ها</div>
        <ul class="address-container">
          <li
            v-for="item in props.profileData.customerAddresses"
            :key="item.id"
          >
            {{ item.detail }}
          </li>
        </ul>
      </div>
    </div>
  </a-card>
</template>

<style lang="scss" scoped>
.row-container {
  width: 100%;
  display: flex;
  margin-top: 24px;
  .item {
    margin-left: 80px;
    .key {
      font-size: 16px;
      line-height: 24px;
      color: #6d6d6d;
      margin-bottom: 4px;
    }
    .value {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
    }
  }
}
.address-container {
  li {
    list-style: disc;
    margin-top: 8px;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #000000;
    margin-right: 16px;
  }
}
</style>
