<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import { useGroupStore } from '@/resources/store/group.store'
import {
  postGroup,
  postGroupPreview,
} from '@/logics/specific/categoryAddFirstStep.handler'
import { goToPath, returnToPreviousRoute } from '@/logics/shared/route.handler'

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

const groupStore = useGroupStore()

const pagination = computed(() => ({
  total: serverData.value?.totalCount ?? 0,
  current: serverData.value?.page ?? 1,
  pageSize: serverData.value?.pageSize,
  showSizeChanger: true,
}))

onBeforeMount(async () => {
  serverData.value = await postGroupPreview({
    from: groupStore.from,
    to: groupStore.to,
    queries: groupStore.queries,
    title: groupStore.title,
  })
})

const onChange = async (paginate: { current: number; pageSize: number }) => {
  serverData.value = await postGroupPreview(
    {
      from: groupStore.from,
      to: groupStore.to,
      queries: groupStore.queries,
      title: groupStore.title,
    },
    paginate
  )
}

const submitGroup = async () => {
  await postGroup({
    from: groupStore.from,
    to: groupStore.to,
    queries: groupStore.queries,
    title: groupStore.title,
  })
  goToPath('/credits')
}

const goToPastStep = () => returnToPreviousRoute()
</script>
<template>
  <div>
    <a-table
      :columns="columns"
      :pagination="pagination"
      :data-source="serverData?.items"
      @change="onChange"
    />
    <div class="text-left">
      <a-button class="mx-2" @click="goToPastStep"> مرحله قبل</a-button>
      <a-button type="primary" class="button-secondary" @click="submitGroup">
        تایید وساخت دسته‌بندی
      </a-button>
    </div>
  </div>
</template>
