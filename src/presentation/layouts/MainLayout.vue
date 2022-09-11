<script setup lang="ts">
import { ref } from 'vue'
import LayoutSideBar from '../components/specific/MainLayout/LayoutSideBar.vue'
import LayoutHeader from '../components/specific/MainLayout/LayoutHeader.vue'
import CollapsableIcon from '../components/specific/MainLayout/CollapsableIcon.vue'
import { t } from 'vui18n'

const collapseState = ref<boolean>(false)

const changeCollapse = () => {
  collapseState.value = !collapseState.value
}
</script>

<template>
  <a-config-provider direction="rtl">
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

        <a-layout>
          <a-layout-content style="background-color: #fff">
            {{ t('name') }}
            {{ t('hey') }}
            <slot name="pageContent" />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </a-config-provider>
</template>
