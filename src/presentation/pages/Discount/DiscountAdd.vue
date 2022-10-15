<script setup lang="ts">
import { t } from 'vui18n'
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import BSteps from '/src/presentation/components/shared/atoms/BSteps.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue-demi'
const route = useRoute()
const currentStep = ref(route.meta?.step as string)
watch(
  route,
  () => {
    currentStep.value = route.meta.step as string
  },
  { deep: true }
)

const steps = [
  {
    title: 'اطلاعات تخفیف',
    description: 'عنوان تخفیف، زمان شروع، ساخت کد...',
  },
  {
    title: 'اطلاعات مصرف کد',
    description: 'مراتب تخفیف، نوع تخفیف، دفعات م...',
  },
  {
    title: 'مشتریان هدف',
    description: 'انتخاب دسته‌بندی مشتریان هدف',
  },
  {
    title: 'روش ارسال',
    description: 'انتخاب روش های ارسال',
  },
]
</script>

<template>
  <content-layout place-return-button>
    <template #content-title>
      {{ t('pages.DiscountAdd.title') }}
    </template>
    <template #content-body>
      <div class="flex justify-center items-center">
        <b-steps :current="currentStep">
          <a-step
            v-for="(item, key) in steps"
            :key="key"
            :title="item.title"
            :description="item.description"
          ></a-step>
        </b-steps>
      </div>
      <hr class="mt-4 mb-4" />

      <router-view />
    </template>
  </content-layout>
</template>
