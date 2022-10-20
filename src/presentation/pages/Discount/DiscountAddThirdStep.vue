<script lang="ts" setup>
import ContentLayout from '/src/presentation/layouts/ContentLayout.vue'
import HintCollapse from '/src/presentation/components/shared/Organisms/HintCollapse.vue'
import BSelect from '/src/presentation/components/shared/atoms/BSelect.vue'
import { ref } from 'vue'
import { t } from 'vui18n'

const selectedCategory = ref('')
const categoryOptions: any[] = []
</script>
<template>
  <content-layout>
    <template #content-body>
      <hint-collapse
        :hints="[
          {
            body: t('pages.DiscountAdd.hints.hintBody'),
            description: t('pages.DiscountAdd.hints.hintDescription'),
          },
        ]"
      />
      <div class="form-container mt-4">
        <div>دسته‌بندی</div>
        <BSelect
          v-model:value="selectedCategory"
          placeholder="دسته‌بندی مورد نظر را انتخاب کنید"
          :options="categoryOptions"
        />
      </div>
    </template>
  </content-layout>
</template>
