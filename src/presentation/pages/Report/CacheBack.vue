<script lang="ts" setup>
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import EmptyLayout from '@/presentation/layouts/EmptyLayout.vue'
</script>
<template>
  <ContentLayout>
    <template #content-title>
      <span style="font-weight: 700; font-size: 24px"> گزارش کش بک </span>
    </template>
    <template v-if="serverData" #content-body>
      <a-card
        :body-style="{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }"
        :bordered="false"
        class="coupon-info-card"
      >
      </a-card>
    </template>
    <template v-else #content-body>
      <empty-layout>
        <template #empty-text>
          متاسفانه داده‌ای برای نمایش گزارش کش بک شما وجود ندارد.
        </template>
        <template #empty-action>
          <a-button
            class="button-secondary"
            type="primary"
            block
            @click="goToPath('/coupons/add')"
          >
            ساخت کش‌بک
          </a-button>
        </template>
      </empty-layout>
    </template>
  </ContentLayout>
</template>
