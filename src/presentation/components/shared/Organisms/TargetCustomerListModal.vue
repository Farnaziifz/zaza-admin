<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { groupCustomer } from '@/core/types/customer.type'

const columns = [
  {
    title: 'نام مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره تماس',
    key: 'mobileNumber',
    dataIndex: 'mobileNumber',
  },
]

const props = defineProps<{
  title: string
  visibility: boolean
  targetCustomerList?: groupCustomer
  paginationData: {
    total: number
    current: number
    pageSize: number
  }
}>()
const emit = defineEmits(['update:visibility', 'changePage'])

const onChange = async (paginate: { current: number; pageSize: number }) =>
  emit('changePage', paginate)

const visibility = ref(props.visibility)
watch(
  props,
  () => {
    visibility.value = props.visibility
  },
  { deep: true }
)
watch(
  visibility,
  () => {
    emit('update:visibility', visibility.value)
  },
  { deep: true }
)
</script>
<template>
  <div>
    <a-modal
      v-model:visible="visibility"
      :title="props.title"
      @ok="visibility = false"
    >
      <a-table
        :columns="columns"
        :pagination="props.paginationData"
        :data-source="props.targetCustomerList?.items"
        @change="onChange"
      />
    </a-modal>
  </div>
</template>
