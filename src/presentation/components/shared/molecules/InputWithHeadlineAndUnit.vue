<script setup lang="ts">
import { ref, watch } from 'vue'

type InputWithHeadlineAndUnit = {
  value: string | number
  headline?: string
  unit: string
  placeholder: string
  disabled?: boolean
}
const emits = defineEmits(['update:value'])
const props = defineProps<InputWithHeadlineAndUnit>()

const inputValue = ref(props.value)
watch(
  props,
  () => {
    inputValue.value = props.value
  },
  { deep: true }
)
watch(
  inputValue,
  () => {
    emits('update:value', inputValue.value)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <div>
      <slot name="headline">
        {{ props.headline }}
      </slot>
    </div>
    <a-input-number
      v-model:value="inputValue"
      :placeholder="placeholder"
      type="number"
      :disabled="props.disabled"
      :min="1"
    >
      <template #addonAfter>
        <span class="px-3 py-2">
          {{ props.unit }}
        </span>
      </template>
    </a-input-number>
  </div>
</template>

<style lang="sass"></style>
