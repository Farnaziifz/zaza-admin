<script lang="ts" setup>
import LogoIcon from '/src/presentation/components/shared/atoms/logoIcon.vue'
import { ref, watch, computed } from 'vue'

import {
  AppstoreOutlined,
  // BookOutlined,
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
      <a-sub-menu key="sub4">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>مدیریت دسته بندی</span>
        </template>
        <a-menu-item key="8">
          <span @click="changeRoute('/dashboard/banner')">
            بنرهای دسته بندی
          </span>
        </a-menu-item>
        <a-menu-item key="9" @click="changeRoute('/dashboard/category')">
          <span>دسته بندی‌ها </span>
        </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub1">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>مدیریت محصولات</span>
        </template>

        <a-menu-item key="1">
          <router-link to="/dashboard/brands/list"> برند محصولات </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/dashboard/tags/list"> تگ محصولات </router-link>
        </a-menu-item>
        <a-menu-item key="3">مدیریت مشخصات محصولات </a-menu-item>
        <a-menu-item key="4">مدیریت محصول </a-menu-item>
        <a-menu-item key="5">نظرات محصولات </a-menu-item>
      </a-sub-menu>

      <a-sub-menu key="sub2">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>مدیریت مجله</span>
        </template>

        <a-menu-item key="1">درجه </a-menu-item>
        <a-menu-item key="2">برچسب </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>مدیریت کاربران</span>
        </template>

        <a-menu-item key="1">درجه </a-menu-item>
        <a-menu-item key="2">برچسب </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss">
@import 'src/assets/styles/layoutSideBar';
</style>
