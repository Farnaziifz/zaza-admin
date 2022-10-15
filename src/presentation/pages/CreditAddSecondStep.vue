<script lang="ts" setup>
import HintCollapse from '@/presentation/components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import { hintType } from '@/core/types/hints.type'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'
import { onMounted, ref, Ref } from 'vue'
import { initHandler } from '@/logics/specific/creditAddSecondStep.handler'

const hints = t('pages.Credit.Add.SecondStep.hints') as unknown as hintType[]
const selectedGroup = ref('')
const groupOptions: Ref<{ label: string; value: string }[] | undefined> = ref(
  []
)

onMounted(async () => {
  const res = await initHandler()
  console.log(res.data?.items)
  res.data?.items?.forEach((el) => {
    groupOptions.value?.push({ label: el.title, value: el.groupId })
  })
})
</script>

<template>
  <hint-collapse :hints="hints" />

  <div class="flex flex-wrap flex-row my-10 items-end">
    <div class="flex flex-col">
      <span style="font-weight: 500; font-size: 16px"> دسته‌بندی </span>
      <b-select
        v-model:value="selectedGroup"
        :options="groupOptions"
        place-holder="دسته‌بندی مورد نظر را انتخاب کنید"
      />
    </div>

    <a-button type="primary" class="button-secondary mx-4">
      افزودن به لیست
    </a-button>
  </div>
</template>
