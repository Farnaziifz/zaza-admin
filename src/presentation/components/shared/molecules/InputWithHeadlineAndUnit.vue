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
  inputValue,
  () => {
    emits('update:value', inputValue.value)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <slot name="headline">
      {{ props.headline }}
    </slot>
    <a-input
      v-model:value="inputValue"
      :placeholder="placeholder"
      type="number"
      :disabled="disabled"
    >
      <template #addonAfter>
        <span class="px-3 py-2">
          {{ props.unit }}
        </span>
      </template>
    </a-input>
  </div>
</template>

<style lang="sass"></style>
