<script setup lang="ts">
import { t } from 'vui18n'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BSteps from '@/presentation/components/shared/atoms/BSteps.vue'
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue-demi'

const route = useRoute()
const currentStep = ref(route.meta?.step)
watch(
  route,
  () => {
    currentStep.value = route.meta.step
  },
  { deep: true }
)
const steps = t('pages.CategoryAdd.steps')
</script>

<template>
  <content-layout place-return-button>
    <template #content-title>
      {{ t('pages.CategoryAdd.title') }}
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
