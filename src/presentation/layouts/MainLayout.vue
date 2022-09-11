<script setup lang="ts">
import { ref } from 'vue'
import LayoutSideBar from '../components/specific/MainLayout/LayoutSideBar.vue'
import LayoutHeader from '../components/specific/MainLayout/LayoutHeader.vue'
import CollapsableIcon from '../components/specific/MainLayout/CollapsableIcon.vue'

const collapseState = ref<boolean>(false)

const changeCollapse = () => {
  collapseState.value = !collapseState.value
}
</script>

<template>
  <a-config-provider direction="rtl">
    <!--  APPLICATION LAYOUT  -->
    <a-layout style="height: 100vh; width: 100vw">
      <!--  APPLICATION HEADER   -->
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

      <!--   APPLICATION BODY   -->
      <a-layout>
        <!--    APPLICATION SIDE BAR    -->
        <layout-side-bar :collapsed="collapseState" />

        <!--    APPLICATION CONTENT IS HERE    -->
        <a-layout>
          <a-layout-content style="background-color: #fff">
            <slot name="pageContent" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
