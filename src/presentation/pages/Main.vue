<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
</script>

<template>
  <MainLayout>
    <template #pageContent>
      <router-view />
    </template>
  </MainLayout>
</template>

<style lang="scss">
@import 'src/assets/styles/main';
</style>
