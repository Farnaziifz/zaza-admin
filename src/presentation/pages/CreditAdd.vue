<script setup lang="ts">
import ContentLayout from '../layouts/ContentLayout.vue'
import { t } from 'vui18n'
import BSteps from '@/presentation/components/shared/atoms/BSteps.vue'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'

// this code uses for to handle step in application.
const route = useRoute()
const currentStep = ref(route.meta?.step as string)
watch(
  route,
  () => {
    currentStep.value = route.meta.step as string
  },
  { deep: true }
)

const steps = {
  firstStep: {
    title: 'جزئیات اعتبار',
    description: 'میزان اعتبار و مدت زمان مصرف آن',
  },
  secondStep: {
    title: 'انتخاب مشتریان هدف',
    description: 'انتخاب مشتریان هدف اعتبار',
  },
}
</script>

<template>
  <content-layout>
    <template #content-title>
      {{ t('pages.Credit.Add.title') }}
    </template>

    <template #content-body>
      <div class="flex justify-center items-center">
        <b-steps :current="currentStep">
          <a-step
            v-for="(item, key) in steps"
            :key="key"
            :title="item.title"
            :description="item.description"
          />
        </b-steps>
      </div>

      <hr class="mt-4 mb-10" />
      <router-view />
    </template>
  </content-layout>
</template>
