<script lang="ts" setup>
import IncentiveDetailLayout from '/src/presentation/layouts/IncentiveDetailLayout.vue'
import CardCollapse from '/src/presentation/components/shared/Organisms/CardCollapse.vue'
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
    <template #layout-content>
      <CardCollapse title="مشوق های وابسته">
        <template #body></template>
      </CardCollapse>
    </template>
  </IncentiveDetailLayout>
</template>
