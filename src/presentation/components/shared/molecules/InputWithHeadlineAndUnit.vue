<script setup lang="ts">
import { ref, watch } from 'vue'

type InputWithHeadlineAndUnit = {
  value: string | number
  headline: string
  unit: string
  placeholder: string
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
    {{ props.headline }}
    <a-input
      v-model:value="inputValue"
      :placeholder="placeholder"
      type="number"
    >
      <template #addonAfter>
        {{ props.unit }}
      </template>
    </a-input>
  </div>
</template>

<style lang="sass">
.ant-input-group-addon
  right: -2px
  border: 1px solid #d9d9d9 !important
</style>
