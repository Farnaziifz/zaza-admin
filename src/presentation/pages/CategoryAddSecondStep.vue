<script setup lang="ts">
import { TableColumnType, TableProps } from 'ant-design-vue'
import { customer, customerList } from '@/core/types/customer.type'
import { computed, onBeforeMount, ref } from 'vue'
import { initPageHandler } from '@/logics/specific/customrtList.handler'

const columns: TableColumnType<customer>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'تاریخ عضویت',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
]

const serverData = ref()

const pagination = computed(() => ({
  total: serverData.value.totalCount,
  current: serverData.value.page,
  pageSize: 10,
  showSizeChanger: true,
}))

onBeforeMount(async () => {
  return
})

const onChange: TableProps<customerList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  serverData.value = await initPageHandler(paginate.current, paginate.pageSize)
}
</script>
<template>
  <a-table
    :columns="columns"
    :data-source="serverData.items"
    :pagination="pagination"
    @change="onChange"
  />
</template>

<style scoped></style>
