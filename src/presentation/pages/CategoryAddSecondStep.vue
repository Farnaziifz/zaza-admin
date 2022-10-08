<script setup lang="ts">
// import { TableColumnType, TableProps } from 'ant-design-vue'
// import { customer, customerList } from '@/core/types/customer.type'
import {
  // computed,
  onBeforeMount,
  ref,
} from 'vue'
import { useGroupStore } from '@/resources/store/group.store'
import {
  // getAllCustomersById,
  postGroupPreview,
} from '@/logics/specific/categoryAddFirstStep.handler'
// import { initPageHandler } from '@/logics/specific/customrtList.handler'

const columns = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره تماس',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber',
  },
]

// const serverData = ref()
const customerInitialData = ref()
const groupStore = useGroupStore()

// const pagination = computed(() => ({
//   total: serverData.value.totalCount,
//   current: serverData.value.page,
//   pageSize: 10,
//   showSizeChanger: true,
// }))

onBeforeMount(async () => {
  customerInitialData.value = await postGroupPreview({
    from: groupStore.from,
    to: groupStore.to,
    queries: groupStore.queries,
    title: groupStore.title,
  })

  // await getAllCustomersById()
  // serverData.value =
})

// const onChange: TableProps<customerList>['onChange'] = async (
//   paginate,
//   sorter
// ) => {
//   console.log('params', paginate, sorter)
//   serverData.value = await initPageHandler(paginate.current, paginate.pageSize)
// }
</script>
<template>
  <div></div>
  <a-table :columns="columns" />
  <!--    :data-source="serverData"-->
  <!--:pagination="pagination"-->
  <!-- <a-table
    :columns="columns"
    :data-source="serverData.items"
    :pagination="pagination"
    @change="onChange"
  /> -->
</template>

<style scoped></style>
