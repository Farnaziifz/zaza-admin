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
    title: 'اطلاعات کوپن',
    description: 'عنوان کوپن نوع کوپن',
  },
  {
    title: 'انتخاب نوع پاداش',
    description: 'انتخاب پاداش و مشخصات آن',
  },
]
</script>

<template>
  <content-layout place-return-button>
    <template #content-title>
      {{ t('pages.CouponAdd.title') }}
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

      <hr class="mt-4 mb-10" />

      <router-view />
    </template>
  </content-layout>
</template>
