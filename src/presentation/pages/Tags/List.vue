<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { onBeforeMount, Ref, ref, computed } from 'vue'
import { TableProps, TableColumnType } from 'ant-design-vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import router from '@/resources/router'
import { type tagList } from '@/core/types/tags.type'
import { initPageHandler } from '@/logics/specific/tags.handler'

const serverData: Ref<tagList> = ref({
  total_pages: 0,
  next: false,
  previous: false,
  current_page: 0,
  results: [],
  count: 0,
})

const columns: TableColumnType<tagList>[] = [
  {
    title: 'تگ',
    key: 'title',
    dataIndex: 'title',
  },
  {
    title: 'عملیات',
    dataIndex: 'actions',
    key: 'actions',
  },
]

const pagination = computed(() => ({
  total: serverData.value.total_pages,
  current: serverData.value.current_page,
  pageSize: 10,
}))

const onChange: TableProps<tagList>['onChange'] = async () => {
  serverData.value = await initPageHandler()
}

onBeforeMount(async () => {
  serverData.value = await initPageHandler()
})
const gotoDetails = (id: string) => {
  router.push({
    name: 'tags-add',
    query: {
      id,
      mode: 'edit',
    },
  })
}

const goToAdd = () => {
  router.push({
    name: 'tags-add',
  })
}
</script>

<template>
  <content-layout>
    <template #content-title>مدیریت تگ‌ها</template>
    <template #content-actions>
      <a-button type="primary" @click="goToAdd">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن تگ </span>
      </a-button>
    </template>
    <template #content-body>
      <div v-if="serverData.results && serverData.results.length">
        <a-table
          :columns="columns"
          :pagination="pagination"
          :data-source="serverData.results"
          @change="onChange"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'actions'">
              <div
                class="customer-action-button"
                @click="gotoDetails(record.id)"
              >
                <a>ویرایش</a>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div v-else>
        <EmptyLayout>
          <template #empty-text> تگی یافت نشد. </template>
          <template #empty-action>
            <a-card
              style="margin: 8px 0; background-color: #f6f6f6; width: 700px"
            >
              <a-typography-title :level="4" class="title-empty"
                >راهنما</a-typography-title
              >
              <ul class="text-guid">
                <li>نظرات</li>
              </ul>
              <p class="guid-value">
                شما در این بخش میتوانید لیست تگ‌های محصولات را مشاهده کنید.
              </p>
            </a-card>
          </template>
        </EmptyLayout>
      </div>
    </template>
  </content-layout>
</template>
