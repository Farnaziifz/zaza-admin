<script lang="ts" setup>
import LogoIcon from '/src/presentation/components/shared/atoms/logoIcon.vue'
import { ref, watch, computed } from 'vue'

import {
  TagsOutlined,
  ApiOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  BookOutlined,
} from '@ant-design/icons-vue'
import router from '../../../../resources/router'

const props = defineProps({
  collapsed: {
    required: true,
    type: Boolean,
  },
})
const sideBarEffectClasses = computed(() => {
  if (collapsed.value === true) return 'side-bar-effect-base'

  return 'side-bar-effect-base side-bar-effect-active'
})
const emits = defineEmits(['update:collapsed'])

watch(
  props,
  (newProp) => {
    collapsed.value = newProp.collapsed
  },
  { deep: true }
)

const collapsed = ref(props.collapsed)
const changeCollapse = () => {
  collapsed.value = !collapsed.value
  emits('update:collapsed', collapsed.value)
}

const changeRoute = (to: string) => {
  router.push(to)
}
</script>

<template>
  <div :class="sideBarEffectClasses" @click="changeCollapse"></div>
  <a-layout-sider
    id="side-bar"
    v-model:collapsed="collapsed"
    collapsible
    breakpoint="sm"
    reverse-arrow
    :trigger="null"
    collapsed-width="0"
    theme="light"
    class="shadow-[0px_2px_8px_rgba(0,0,0,0.15)]"
    width="256"
  >
    <a-menu
      id="side-bar-menu"
      :sub-menu-open-delay="100"
      :sub-menu-close-delay="100"
      mode="inline"
    >
      <logo-icon class="mt-4" />
      <a-menu-item key="20" @click="changeRoute('/')">
        <template #icon>
          <appstore-outlined />
        </template>
        <span> داشبورد</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> دسته‌بندی</span>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>برچسب پویایی</span>
        </template>

        <a-menu-item key="1" @click="changeRoute('/label-settings/degree')"
          >درجه
        </a-menu-item>
        <a-menu-item key="2" @click="changeRoute('/label-settings/badge')"
          >برچسب
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="3" @click="changeRoute('/customers/list')">
        <template #icon>
          <appstore-outlined />
        </template>
        <span>لیست مشتریان</span>
      </a-menu-item>
      <a-sub-menu key="sub3">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>مشوق‌ها</span>
        </template>

        <a-menu-item key="4" @click="changeRoute('/coupons/list')"
          >کوپن‌ها
        </a-menu-item>
        <a-menu-item key="5" @click="changeRoute('/credits/list')"
          >هدیه اعتباری
        </a-menu-item>
        <a-menu-item key="6" @click="changeRoute('/discount/list')"
          >کد تخفیف
        </a-menu-item>
        <a-menu-item key="7" @click="changeRoute('/cashback')">
          کش‌بک
        </a-menu-item>
        <a-menu-item key="8" @click="changeRoute('/score')">
          امتیاز
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub4">
        <template #icon>
          <bar-chart-outlined />
        </template>
        <template #title> گزارش ها</template>

        <a-menu-item key="9" @click="changeRoute('/report/discount-list')">
          کدهای تخفیف
        </a-menu-item>
        <a-menu-item key="10" @click="changeRoute('/report/coupon-list')">
          کوپن ها
        </a-menu-item>
        <a-menu-item key="11" @click="changeRoute('/report/cashback-list')">
          کش بک
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub5">
        <template #icon>
          <ApiOutlined />
        </template>
        <template #title>
          <span>هوش تجاری</span>
        </template>

        <a-menu-item
          key="12"
          @click="changeRoute('/business-intelligence/churn-evaluation')"
        >
          ارزیابی از دست رفتن مشتریان
        </a-menu-item>
        <a-menu-item
          key="13"
          @click="changeRoute('/business-intelligence/loyalty-evaluation')"
          >ارزیابی وفاداری مشتریان
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="14" @click="changeRoute('/comments/list')">
        <span>نظرات</span>
        <template #icon>
          <appstore-outlined />
        </template>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss">
@import 'src/assets/styles/layoutSideBar';
</style>
