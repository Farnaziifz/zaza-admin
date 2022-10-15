<script setup lang="ts">
import ReturnButton from '/src/presentation/components/shared/molecules/ReturnButton.vue'
import { returnToPreviousRoute } from '@/logics/shared/route.handler'

type contentLayoutPropsType = {
  placeReturnButton?: boolean
}

const props = defineProps<contentLayoutPropsType>()
const changePathToPreviousRoute = () => returnToPreviousRoute()
</script>

<template>
  <div class="px-6 py-6 background-color-pure-white">
    <div
      v-if="props.placeReturnButton"
      id="return-button-container"
      class="my-2"
    >
      <slot name="return-button">
        <return-button @click="changePathToPreviousRoute" />
      </slot>
    </div>

    <div class="content-header-container">
      <h1 class="mb-6">
        <slot name="content-title"></slot>
      </h1>
      <div class="content-actions">
        <slot name="content-actions"></slot>
      </div>
    </div>
    <slot name="content-body"></slot>
  </div>
</template>

<style lang="scss" scoped>
@import 'src/assets/styles/contentLayout.scss';
</style>
