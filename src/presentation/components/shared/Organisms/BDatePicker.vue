<script lang="ts" setup>
import DatePicker from 'vue3-persian-datetime-picker'
import { CalendarOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'

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
  pickedDate,
  () => {
    emits('update:value', pickedDate.value)
  },
  { deep: true }
)
</script>
<template>
  <div>
    <slot name="headline" />
    <a-input
      :id="`${customId ?? 'b-date-picker'}`"
      :placeholder="props.placeHolder"
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
