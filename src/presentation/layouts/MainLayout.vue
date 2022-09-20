<script setup lang="ts">
import { ref } from 'vue'
import LayoutSideBar from '../components/specific/MainLayout/LayoutSideBar.vue'
import LayoutHeader from '../components/specific/MainLayout/LayoutHeader.vue'
import CollapsableIcon from '../components/specific/MainLayout/CollapsableIcon.vue'
import fa_IR from 'ant-design-vue/lib/locale/fa_IR'

const collapseState = ref<boolean>(false)

const changeCollapse = () => {
  collapseState.value = !collapseState.value
}
</script>

<template>
  <a-config-provider direction="rtl" :locale="fa_IR">
    <a-layout style="height: 100vh; width: 100vw">
      <layout-header>
        <template #collapseIcon>
          <collapsable-icon
            class="mx-2"
            :is-collapsed="collapseState"
            @change-collapse="changeCollapse"
          />
        </template>
        <template #businessName> business Name</template>
        <template #adminName> admin Name</template>
      </layout-header>

      <a-layout>
        <layout-side-bar :collapsed="collapseState" />

        <a-layout class="overflow-y-scroll">
          <a-layout-content class="background-color-pure-white">
            <slot name="pageContent" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>

<style lang="sass">
@import "src/assets/styles/mainLayout"
</style>
