<script lang="ts" setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
</script>

<template>
  <IncentiveDetailLayout>
    <template #layout-title>جزئیات دسته‌بندی مشتریان جدید</template>
    <template #layout-actions>
      <div class="actions-button">
        <a-tag color="green">فعال</a-tag>
        <a-tag color="red">غیرفعال</a-tag>
        <a-button type="primary" size="small">تغییر وضعیت</a-button>
      </div>
    </template>
    <template #layout-content> </template>
  </IncentiveDetailLayout>
</template>
