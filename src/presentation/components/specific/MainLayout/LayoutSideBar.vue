<script lang="ts" setup>
import LogoIcon from '/src/presentation/components/shared/atoms/logoIcon.vue'
import { ref, watch, computed } from 'vue'
// import LabelsIcon from '../../shared/atoms/LabelsIcon.vue';
import { TagsOutlined } from '@ant-design/icons-vue'
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
  >
    <a-menu
      id="side-bar-menu"
      :sub-menu-open-delay="100"
      :sub-menu-close-delay="100"
      mode="inline"
    >
      <logo-icon class="mt-4" />
      <a-sub-menu key="sub2">
        <template #icon>
          <tags-outlined />
        </template>
        <template #title>
          <span>برچسب پویایی</span>
        </template>

        <a-menu-item key="1" @click="changeRoute('/label-settings/degree')"
          >درجه</a-menu-item
        >
        <a-menu-item key="2" @click="changeRoute('/label-settings/badge')"
          >برچسب</a-menu-item
        >
      </a-sub-menu>
      <a-menu-item key="3" @click="changeRoute('/customers/list')">
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
          >کوپن‌ها</a-menu-item
        >
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="scss">
@import 'src/assets/styles/layoutSideBar';
</style>
