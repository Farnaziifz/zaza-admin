<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import BMessage from '@/presentation/components/shared/atoms/BMessage.vue'
import BRfmChart from '@/presentation/components/shared/Organisms/BRfmChart.vue'

import { useMainStore } from '@/resources/store/main.store'

const mainStore = useMainStore()
const closeMessage = () => mainStore.closeMessage()
</script>

<template>
  <b-message v-bind="mainStore.message" @on-close="closeMessage" />
  <MainLayout>
    <template #pageContent>
      <BRfmChart
        class="m-16"
        :hero-amount="3"
        :loyal-amount="1"
        :attention-need-amount="2"
        :lazy-amount="6"
        :churn-amount="3"
        :normal-amount="1"
      />

      <router-view />
    </template>
  </MainLayout>
</template>

<style lang="scss">
@import 'src/assets/styles/main';
</style>
