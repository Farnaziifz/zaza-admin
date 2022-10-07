<script setup lang="ts">
import { t } from 'vui18n'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import BSteps from '/src/presentation/components/shared/atoms/BSteps.vue'

const steps = t('pages.CouponAdd.steps')
</script>

<template>
  <content-layout place-return-button>
    <template #content-title>
      {{ t('pages.CouponAdd.title') }}
    </template>
    <template #content-body>
      <div class="flex justify-center items-center">
        <b-steps :current="0">
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
