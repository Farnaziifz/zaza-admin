<script setup lang="ts">
import {ref} from 'vue'
import CollapsableIcon from "../components/specific/MainLayout/CollapsableIcon.vue";
import LayoutHeaderItemGroup from "../components/specific/MainLayout/LayoutHeaderItemGroup.vue"
import LayoutHeaderItem from "../components/specific/MainLayout/LayoutHeaderItem.vue";
import LogoIcon from "../components/shared/atoms/logoIcon.vue";

const collapseState = ref<boolean>(false)

const changeCollapse = () => {
  collapseState.value = !collapseState.value
}
</script>

<template>
  <a-layout style="height: 100vh; width: 100vw; direction: rtl;">
    <a-layout-header style="background-color: #FF003D">
      <layout-header-item-group>
        <layout-header-item>
          <collapsable-icon class="mx-2" :is-collapsed="collapseState" @change-collapse="changeCollapse"/>
          business name
        </layout-header-item>
        <layout-header-item>
          admin Name
        </layout-header-item>
      </layout-header-item-group>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
          v-model:collapsed="collapseState"
          collapsible
          breakpoint="lg"
          reverse-arrow
          :trigger="null"
          collapsed-width="0"
          theme="light"
          class="shadow-[0px_2px_8px_rgba(0,0,0,0.15)]"
      >
        <logo-icon class="mt-4"/>
      </a-layout-sider>
      <a-layout>
        <!--    PAGE CONTENT IS HERE    -->
        <a-layout-content style=" background-color: #fff">
          <slot/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

