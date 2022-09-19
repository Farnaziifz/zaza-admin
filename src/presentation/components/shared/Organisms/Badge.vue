<script lang="ts" setup>
type badgeProps = {
  color: string
  background: string
}
const props = defineProps<badgeProps>()
</script>

<template>
  <span
    class="badge-container"
    :style="{
      borderColor: props.color,
      background: props.background,
      color: props.color,
    }"
  >
    <slot></slot>
  </span>
</template>

<style lang="scss">
@import 'src/assets/styles/badge.scss';
</style>
