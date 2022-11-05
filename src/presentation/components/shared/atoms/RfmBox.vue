<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width: number
    backgroundColor: string
    textColor: string
    height: number
    text?: string
    fontWeight?: number
    fontSize?: number
    tooltipTitle: string
    tooltipPosition?: string
  }>(),
  {
    fontSize: 12,
    fontWeight: 500,
    tooltipPosition: 'top',
  }
)
</script>
<template>
  <a-tooltip :title="props.tooltipTitle" :placement="tooltipPosition">
    <div
      :style="{
        width: `${props.width}px`,
        color: `${props.textColor}`,
        backgroundColor: `${props.backgroundColor}`,
        height: `${props.height ? props.height + 'px' : 'inherit'}`,
        fontWeight: props.fontWeight,
        fontSize: `${props.fontSize}px`,
      }"
      class="text-center flex items-center justify-center"
    >
      <slot v-if="props.height >= 32 && props.width >= 24" name="text">
        {{ props.width }}
      </slot>
    </div>
  </a-tooltip>
</template>
