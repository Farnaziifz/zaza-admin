<script lang="ts" setup>
import router from '@/resources/router'
import ArrowRightIcon from '@/presentation/components/shared/atoms/ArrowRight.vue'

const props = defineProps({
  hasReturnButton: {
    default: true,
    type: Boolean,
  },
})

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <div class="incentive-layout-container">
    <div class="px-6 py-10 background-color-pure-white">
      <div
        v-if="props.hasReturnButton"
        class="back-button-container"
        @click="goBack"
      >
        <ArrowRightIcon />
        <span>بازگشت</span>
      </div>
      <div class="title-container">
        <h1>
          <slot name="layout-title"></slot>
        </h1>
        <div class="actions-container">
          <slot name="layout-actions"></slot>
        </div>
      </div>
      <div class="content-container">
        <slot name="layout-content"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.incentive-layout-container {
  .back-button-container {
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      margin-right: 12px;
    }
  }

  .title-container {
    margin-top: 8px;
    display: flex;
    width: 100%;
    justify-content: space-between;

    h1 {
      font-weight: 700;
      font-size: 24px;
      line-height: 32px;
      color: #000000;
    }
  }

  .content-container {
    margin-top: 40px;
  }

  .actions-container {
  }
}
</style>
