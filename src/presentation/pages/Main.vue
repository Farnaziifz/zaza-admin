<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import BMessage from '@/presentation/components/shared/atoms/BMessage.vue'

import { useMainStore } from '@/resources/store/main.store'

const mainStore = useMainStore()
const closeMessage = () => mainStore.closeMessage()
</script>

<template>
  <b-message v-bind="mainStore.message" @on-close="closeMessage" />
  <MainLayout>
    <template #pageContent>
      <router-view />
    </template>
  </MainLayout>
</template>

<style lang="scss">
@import 'src/assets/styles/main';
</style>
