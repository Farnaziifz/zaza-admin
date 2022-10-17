<script lang="ts" setup>
import DatePicker from 'vue3-persian-datetime-picker'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'

type BDatePickerProps = {
  value?: string | string[] | Date
  placeHolder: string
  range: boolean
  customId?: string
}
const props = defineProps<BDatePickerProps>()
const emits = defineEmits(['update:value'])

const pickedDate = ref(props.value)
watch(
  props,
  () => {
    pickedDate.value = props.value
  },
  { deep: true }
)
watch(
  pickedDate,
  () => {
    emits('update:value', pickedDate.value)
  },
  { deep: true }
)
const pickedComputed = computed(() => {
  if (pickedDate.value && typeof pickedDate.value !== 'string')
    return new pd(pickedDate.value).toLocale('en').format('YYYY/MM/DD')
  else return undefined
})
</script>
<template>
  <div>
    <slot name="headline" />
    <a-input
      :id="`${customId ?? 'b-date-picker'}`"
      :placeholder="props.placeHolder"
      :value="pickedComputed"
    >
      <template #prefix>
        <calendar-outlined class="ml-1" />
      </template>
    </a-input>
    <date-picker
      v-model="pickedDate"
      :range="props.range"
      :custom-input="`${customId ? '#' + customId : '#b-date-picker'}`"
    />
  </div>
</template>
