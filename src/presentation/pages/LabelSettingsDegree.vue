<script async setup lang="ts">
import { onBeforeMount, ref, Ref } from 'vue'
import BSelect from '../components/shared/atoms/BSelect.vue'
import { degreeOptions } from '../../core/constants/degree.options'
import HintCollapse from '../components/shared/organisms/HintCollapse.vue'
import InputWithHeadlineAndUnit from '../components/shared/molecules/InputWithHeadlineAndUnit.vue'
import ContentLayout from '../layouts/ContentLayout.vue'
import {
  changeServerDataHandler,
  changeServerStatusHandler,
  initPageHandler,
  updatePageHandler,
} from '../../logics/specific/labelSettingsDegree.handler'
import { t } from 'vui18n'
import { degree } from '../../core/types/degree.type'
import { degreeType } from '../../core/enums/degreeType.enum'
import BConfirmModal from '../components/shared/atoms/BConfirmModal.vue'

const serverData: Ref<degree> = ref({
  amount: 0,
  isActive: false,
  type: undefined,
  value: 0,
})
const modalSubmissionButtonLoader = ref(false)

onBeforeMount(async () => {
  serverData.value = await initPageHandler()
})

const turnOnLoader = () => (modalSubmissionButtonLoader.value = true)
const turnOffLoader = () => (modalSubmissionButtonLoader.value = false)
const openSubmissionModal = () => (modalVisibility.value = true)
const closeSubmissionModal = () => (modalVisibility.value = false)

const updatePageData = async () =>
  (serverData.value = await updatePageHandler())

const changeServerData = async () =>
  await changeServerDataHandler(serverData.value)

const changeType = () => (serverData.value.amount = serverData.value.value = 0)

const changeDegreeStatus = async () => {
  turnOnLoader()
  await changeServerStatusHandler()
  turnOffLoader()
  closeSubmissionModal()
  await updatePageData()
}

const modalVisibility = ref(false)
</script>

<template>
  <content-layout>
    <template #content-title> درجه</template>

    <template #content-body>
      <hint-collapse
        :hints="[{ body: t('pages.LabelSettingsDegree.hint') }]"
        header="راهنما"
      />

      <a-card style="margin: 8px 0; background-color: #f6f6f6">
        <div class="flex justify-between">
          <h2>فعال سازی اطلاع رسانی برچسب</h2>
          <a-switch
            :checked-value="serverData.isActive"
            @click="openSubmissionModal"
          />
        </div>
      </a-card>

      <a-card style="margin: 8px 0; background-color: #f6f6f6" disabled="true">
        <h2>اطلاعات درجه</h2>

        <div class="mt-4">
          <h3>نوع محاسبه درجه</h3>
          <b-select
            v-model:value="serverData.type"
            style="width: 254px"
            :options="degreeOptions"
            suffix-icon-color="#ff003d"
            place-holder="نوع محاسبه را انتخاب کنید"
            @change="changeType"
          />
        </div>

        <div
          v-if="serverData.type === degreeType.PER_ORDER"
          class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
            v-model:value="serverData.value"
            class="ml-4 sm:mb-4"
            headline="تعداد سفارش"
            unit="تعداد"
            placeholder=" تعداد سفارش را وارد کنید"
            style="width: 254px"
          />

          <input-with-headline-and-unit
            v-model:value="serverData.amount"
            class="ml-4 sm:mb-4"
            unit="درجه"
            headline="مقدار درجه"
            style="width: 254px"
            placeholder="مقدار درجه را وارد کنید"
          />
        </div>

        <div
          v-else-if="serverData.type === degreeType.PER_PRICE"
          class="flex flex-wrap items-center pt-4"
        >
          <input-with-headline-and-unit
            v-model:value="serverData.value"
            class="ml-4 sm:mb-4"
            unit="تومان"
            placeholder="مبلغ را وارد کنید"
            style="width: 254px"
            headline="مبلغ مورد نظر"
          />

          <input-with-headline-and-unit
            v-model:value="serverData.amount"
            class="ml-4 sm:mb-4"
            unit="درجه"
            headline="مقدار درجه"
            placeholder="مقدار درجه را وارد کنید"
            style="width: 254px"
          />
        </div>
      </a-card>

      <div class="text-left">
        <a-button
          type="primary"
          style="padding: 0 56px"
          class="button-secondary"
          @click="changeServerData"
        >
          ثبت تغییرات
        </a-button>
      </div>

      <b-confirm-modal
        v-model:value="modalVisibility"
        :title="
          serverData.isActive
            ? t('pages.LabelSettingsDegree.modalTitleForDeActivation')
            : t('pages.LabelSettingsDegree.modalTitleForActivation')
        "
        :content="
          serverData.isActive
            ? t('pages.LabelSettingsDegree.modalContentForActivation')
            : t('pages.LabelSettingsDegree.modalContentForDeActivation')
        "
        :ok-text="
          serverData.isActive
            ? t('pages.LabelSettingsDegree.modalDeActiveButtonContent')
            : t('pages.LabelSettingsDegree.modalActiveButtonContent')
        "
        cancel-text="بستن"
        :ok-type="serverData.isActive ? 'danger' : 'success'"
        @ok="changeDegreeStatus"
        @cancel="closeSubmissionModal"
      />
    </template>
  </content-layout>
</template>
