<script lang="ts" setup async>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { onBeforeMount, Ref, ref, computed } from 'vue'
import { commentList, comments } from '@/core/types/comments.type'
import { TableProps, TableColumnType } from 'ant-design-vue'

// import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'

import { initPageHandler } from '@/logics/specific/comments.handler'
import router from '@/resources/router'
import { useRoute } from 'vue-router'

const serverData: Ref<commentList> = ref({
  items: [],
  hasNextPage: false,
  hasPreviousPage: false,
  page: 0,
  totalCount: 0,
  totalPages: 0,
})
const route = useRoute()
const routeId = String(route.params.id)

const columns: TableColumnType<comments>[] = [
  {
    title: 'مشتری',
    key: 'fullName',
    dataIndex: 'fullName',
  },
  {
    title: 'شماره سفارش',
    key: 'trackingCode',
    dataIndex: 'trackingCode',
  },
  {
    title: 'امتیاز ثبت شده',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: 'متن نظر',
    dataIndex: 'comment',
    key: 'comment',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

onBeforeMount(async () => {
  const page = 1
  const pageSize = 10
  serverData.value = await initPageHandler(page, pageSize)
})

const pagination = computed(() => ({
  total: serverData.value.totalCount,
  current: serverData.value.page,
  pageSize: 10,
  // showSizeChanger: true,
}))

const onChange: TableProps<commentList>['onChange'] = async (
  paginate,
  sorter
) => {
  console.log('params', paginate, sorter)
  serverData.value = await initPageHandler(paginate.current, paginate.pageSize)
}
const gotoDetails = (fId: string, oId: string, orderName: string) => {
  router.push({
    name: 'comment-details',
    params: {
      orderName,
      cId: routeId,
      fId,
      oId,
    },
  })
}
</script>
<template>
  <content-layout>
    <template #content-title>نظرات</template>
    <template #content-body>
      <div v-if="serverData.items && serverData.items.length">
        <a-table
          :columns="columns"
          :pagination="pagination"
          :data-source="serverData.items"
          @change="onChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
              <div
                class="customer-action-button"
                @click="
                  gotoDetails(record.id, record.orderId, record.trackingCode)
                "
              >
                <a>جزئیات</a>
              </div>
            </template>
            <template v-if="column.key === 'comment'">
              <p class="comment-container">{{ record.comment }}</p>
            </template>
          </template>
        </a-table>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss" scoped>
.comment-container {
  white-space: nowrap;
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 auto;
}
</style>
