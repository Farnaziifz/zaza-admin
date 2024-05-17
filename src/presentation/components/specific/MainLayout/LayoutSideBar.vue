<script lang="ts" setup>
import LogoIcon from '/src/presentation/components/shared/atoms/logoIcon.vue'
import { ref, watch, computed } from 'vue'

import {
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
  <a-layout-sider id="side-bar" v-model:collapsed="collapsed" collapsible breakpoint="sm" reverse-arrow :trigger="null"
    collapsed-width="0" theme="light" class="shadow-[0px_2px_8px_rgba(0,0,0,0.15)]" width="256">
    <a-menu id="side-bar-menu" :sub-menu-open-delay="100" :sub-menu-close-delay="100" mode="inline">
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
        <span> وضعیت کاربر</span>
      </a-menu-item>

      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> تعیین دسترسی</span>
      </a-menu-item>

      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> تکنسین‌ها</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت سفارشات</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت کیف پول</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت تراکنش‌ها</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت رخداد</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت تیکت</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> مدیریت نظرسنجی</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> تنظیمات</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> جستجو</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> repost</span>
      </a-menu-item>
      <a-menu-item key="21" @click="changeRoute('/group/list')">
        <template #icon>
          <book-outlined />
        </template>
        <span> repost</span>
      </a-menu-item>


    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss">
@import 'src/assets/styles/layoutSideBar';
</style>
