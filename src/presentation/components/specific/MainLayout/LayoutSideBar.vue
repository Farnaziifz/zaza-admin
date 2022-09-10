<script lang="ts" setup>
import LogoIcon from "/src/presentation/components/shared/atoms/logoIcon.vue"
import {ref, watch, computed} from "vue";

const props = defineProps(
    {
      collapsed: {
        required: true,
        type: Boolean,
      }
    }
)
const sideBarEffectClasses = computed(() => {
  if (collapsed.value === true) return 'side-bar-effect-base'

  return 'side-bar-effect-base side-bar-effect-active'
})
const emits = defineEmits(['update:collapsed'])

watch(props, (newProp) => {
  collapsed.value = newProp.collapsed
}, {deep: true})

const collapsed = ref(props.collapsed)
const changeCollapse = () => {
  collapsed.value = !collapsed.value
  emits("update:collapsed", collapsed.value)
}
</script>

<template>
  <div :class="sideBarEffectClasses" @click="changeCollapse"></div>
  <a-layout-sider
      v-model:collapsed="collapsed"
      id="side-bar"
      collapsible
      breakpoint="sm"
      reverse-arrow
      :trigger="null"
      collapsed-width="0"
      theme="light"
      class="shadow-[0px_2px_8px_rgba(0,0,0,0.15)]"
  >

    <a-menu
        :sub-menu-open-delay="100"
        :sub-menu-close-delay="100"
        mode="inline"
        style="color: #d0098f"
    >
      <logo-icon class="mt-4"/>
      <a-sub-menu key="sub2">
        <template #title>
              <span style="direction: rtl">
                <span>Team</span>
              </span>
        </template>
        <a-menu-item>Team 1</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<style lang="sass">
@import "src/assets/styles/layoutSideBar"
</style>