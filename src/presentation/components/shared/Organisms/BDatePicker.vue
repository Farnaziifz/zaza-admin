<script lang="ts" setup>
import DatePicker from 'vue3-persian-datetime-picker'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { computed, ref, watch } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import pd from 'persian-date'
import { convertDateArrayToDateString } from '@/logics/shared/date.handler'

type BDatePickerProps = {
  value?: string | string[] | Date[] | Date
  placeHolder: string
  range: boolean
  customId?: string
  dateType?: boolean
  minDate?: string
  disabled?: boolean
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
  if (props.range)
    return convertDateArrayToDateString(props.value as Date[] | string[])
  else if (props.value instanceof Date)
    return new pd(props.value).toLocale('fa').format('YYYY/MM/DD')

  return pickedDate.value
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
      :type="props.dateType ? 'datetime' : 'date'"
      :min="minDate"
      :disabled="disabled ?? false"
    />
  </div>
</template>
