<script setup lang="ts">
import { ref, watch } from 'vue'
import { CascaderOptionType } from 'ant-design-vue/es/cascader'
import ChevronUpIcon from './ChevronUpIcon.vue'

type BSelectPropsType = {
  placeHolder?: string
  options: CascaderOptionType
  suffixIconColor?: string
  disabled?: boolean
  value?: string
  // selectedValue: string
}
const props = defineProps<BSelectPropsType>()
const emits = defineEmits(['update:value', 'change'])

const isActivated = ref(false)
const expandIcon = () => {
  isActivated.value = !isActivated.value
}

const selectedValue = ref(props.value ? props.value : props.placeHolder)
watch(
  props,
  () => {
    selectedValue.value = props.value
  },
  { deep: true }
)

watch(
  selectedValue,
  () => {
    emits('update:value', selectedValue.value)
  },
  { deep: true }
)
</script>

<template>
  <a-select
    v-model:value="selectedValue"
    :disabled="props.disabled"
    dropdown-match-select-width
    :options="props.options"
    :placeholder="props.placeHolder"
    style="min-width: 216px"
    @click="expandIcon"
    @change="emits('change')"
  >
    <template #suffixIcon>
      <chevron-up-icon
        :color="props.suffixIconColor"
        :style="{
          rotate: isActivated ? '0deg' : '-180deg',
          transition: 'all 0.2s',
          height: '12px',
          width: '12px',
        }"
      />
    </template>
  </a-select>
</template>
