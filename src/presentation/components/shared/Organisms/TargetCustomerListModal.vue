<script setup lang="ts">
import { computed, defineProps, ref, watch } from 'vue'

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

const serverData = ref()

const pagination = computed(() => ({
  total: serverData.value?.totalCount ?? 0,
  current: serverData.value?.page ?? 1,
  pageSize: serverData.value?.pageSize,
  showSizeChanger: true,
}))

const onChange = async (paginate: { current: number; pageSize: number }) => {
  // TODO => change it to getGroup
  // serverData.value = await postGroupPreview(
  //   {
  //     from: groupStore.from,
  //     to: groupStore.to,
  //     queries: groupStore.queries,
  //     title: groupStore.title,
  //   },
  //   paginate
  // )
  return paginate
}

const props = defineProps<{ visibility: boolean }>()
const visibility = ref(props.visibility)
const emit = defineEmits(['update:visibility'])
watch(
  visibility,
  () => {
    emit('update:visibility', visibility.value)
  },
  { deep: true }
)
</script>
<template>
  <a-modal v-model:visible="visibility">
    <a-table
      :columns="columns"
      :pagination="pagination"
      :data-source="serverData?.items"
      @change="onChange"
    />
  </a-modal>
</template>
