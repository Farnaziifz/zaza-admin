<script setup lang="ts">
import { ref, watch } from 'vue'

type InputWithHeadline = {
  type: string
  headline?: string
  value: string | number
  placeholder: string
}
const emits = defineEmits(['update:value'])
const props = defineProps<InputWithHeadline>()

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
    <slot name="headlineText">
      {{ props.headline }}
    </slot>
    <a-input
      v-model:value="inputValue"
      :placeholder="placeholder"
      :type="props.type"
    >
    </a-input>
  </div>
</template>

<style lang="sass"></style>
