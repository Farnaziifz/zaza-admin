<script lang="ts" setup>
import BConfirmModal from '@/presentation/components/shared/atoms/BConfirmModal.vue'
import {
  changeScoreStatusHandler,
  initHandler,
} from '@/logics/specific/score.handler'
import ContentLayout from '@/presentation/layouts/ContentLayout.vue'
import { score } from '@/core/types/score.type'
import { onMounted, ref, Ref } from 'vue'
import { t } from 'vui18n'

const serverData: Ref<score> = ref({
  unit: 0,
  amount: 0,
  isActive: false,
  type: '',
})
const showModal = ref(false)

const closeSubmissionModal = () => (showModal.value = false)
const openSubmissionModal = () => (showModal.value = true)

const changeScoreActivation = async () => {
  closeSubmissionModal()
  await changeScoreStatusHandler()
  await initialize()
}

const initialize = async () => {
  const res = await initHandler()
  if (res.data) serverData.value = res.data
}

onMounted(async () => {
  await initialize()
})
</script>

<template>
  <content-layout>
    <template #content-title> امتیاز</template>
    <template #content-body>
      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <div class="flex justify-between">
          <h2 style="font-weight: 700; font-size: 20px">فعال سازی امتیاز</h2>
          <a-switch
            :checked-value="serverData.isActive"
            @click="openSubmissionModal"
          />
        </div>
      </a-card>

      <b-confirm-modal
        v-model:value="showModal"
        cancel-text="بستن"
        :ok-type="serverData.isActive ? 'danger' : 'success'"
        :ok-text="
          serverData.isActive
            ? t('pages.LabelSettingsDegree.modalDeActiveButtonContent')
            : t('pages.LabelSettingsDegree.modalActiveButtonContent')
        "
        :title="
          serverData.isActive
            ? 'غیر فعال کردن کش‌‍بک'
            : 'فعال سازی غیر فعال کردن کش‌‍بک'
        "
        :content="
          serverData.isActive
            ? 'آیا از غیرفعال کردن کش‌بک مطمئن هستید؟'
            : 'آیا از فعال کردن کش‌بک مطمئن هستید؟'
        "
        @ok="changeScoreActivation"
        @cancel="closeSubmissionModal"
      />
    </template>
  </content-layout>
</template>
