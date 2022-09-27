<script setup lang="ts">
type BStepsPropsType = {
  current: number | string
  responsive?: boolean
}
const props = defineProps<BStepsPropsType>()
</script>

<template>
  <div id="stepper-container" class="flex">
    <a-steps :current="props.current" :responsive="props.responsive">
      <slot></slot>
    </a-steps>
  </div>
</template>

<style lang="scss">
#stepper-container {
  //min-width: 320px;
}
</style>
