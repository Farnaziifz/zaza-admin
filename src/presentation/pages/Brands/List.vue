<script setup lang="ts">
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import { onBeforeMount, Ref, ref, computed } from 'vue'
import { TableProps, TableColumnType } from 'ant-design-vue'
import EmptyLayout from '/src/presentation/layouts/EmptyLayout.vue'
import router from '@/resources/router'
import { brandItem, brandList } from '@/core/types/brand.type'
import { initPageHandler } from '@/logics/specific/brands.handler'

const serverData: Ref<brandList> = ref({
  total_pages: 0,
  next: false,
  previous: false,
  current_page: 0,
  results: [],
  count: 0,
})
const columns: TableColumnType<brandItem>[] = [
  {
    title: 'عکس برند',
    key: 'image',
    dataIndex: 'image',
  },
  {
    title: 'نام برند',
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
  pageSize: 3,
}))

const onChange: TableProps<brandList>['onChange'] = async () => {
  serverData.value = await initPageHandler()
}

onBeforeMount(async () => {
  serverData.value = await initPageHandler()
})
const gotoDetails = (id: string) => {
  router.push({
    name: 'comment-detail',
    params: {
      id,
    },
  })
}
const goToAdd = () => {
  router.push({ name: 'brand-add' })
}
</script>

<template>
  <content-layout>
    <template #content-title>برندها</template>
    <template #content-actions>
      <a-button type="primary" @click="goToAdd">
        <template #icon><PlusIcon color="#fff" /></template>
        <span>افزودن برند</span>
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
            <template v-if="column.key === 'image'">
              <img :src="record.image" alt="" class="w-[100px] h-[100px]" />
            </template>
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
          <template #empty-text> برندی یافت نشد. </template>
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
                شما در این بخش میتوانید لیست برند‌های محصولات را مشاهده کنید.
              </p>
            </a-card>
          </template>
        </EmptyLayout>
      </div>
    </template>
  </content-layout>
</template>

<style lang="scss"></style>
