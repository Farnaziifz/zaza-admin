<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width: number
    backgroundColor: string
    textColor: string
    height?: number
    text?: string
    fontWeight?: number
    fontSize?: number
    tooltipTitle: string
    tooltipPosition?: string
    heightSizeType?: 'px' | '%'
    widthSizeType?: 'px' | '%'
  }>(),
  {
    fontSize: 12,
    fontWeight: 500,
    heightSizeType: 'px',
    widthSizeType: 'px',
  }
)
console.log(props.height)
</script>
<template>
  <a-tooltip :title="props.tooltipTitle" :placement="tooltipPosition">
    <div
      :style="{
        width: `${props.width}${props.widthSizeType}`,
        color: `${props.textColor}`,
        backgroundColor: `${props.backgroundColor}`,
        height: `${
          props.height ? props.height + props.heightSizeType : 'inherit'
        }`,
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
