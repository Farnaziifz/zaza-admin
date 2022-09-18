<script setup lang="ts">
type inputBadgeLabelProps = {
  backgroundColor: string
  outlineColor: string
  textColor: string
  title: string
}
const props = defineProps<inputBadgeLabelProps>()
</script>
<template>
  <div
    :style="{
      border: 'unset',
      height: '30px !important',
      backgroundColor: props.backgroundColor,
      color: props.textColor,
      outline: `1px solid ${props.outlineColor}`,
    }"
  >
    {{ props.title }}
  </div>
</template>
