<script setup lang="ts">
import ContentLayout from '../layouts/ContentLayout.vue'
import HintCollapse from '../components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import { hintType } from '../../core/types/hints.type'
import InputBadgeLabel from '../components/specific/LabelSettings/InputBadgeLabel.vue'
import { badgeDataFactory } from '../factory/specific/labelSettings/labelSettingsBadgeData.factory'
import {
  initHandler,
  mapServerDataToInitialDataHandler,
  validateAndChangeServerDataHandler,
} from '../../logics/specific/labelSettingsBadge'
import { onBeforeMount } from 'vue'
import { convertFieldToNumber } from '../../logics/shared/filedManipulator'

const hints: hintType[] = [
  {
    body: t('pages.LabelSettingsBadge.hint'),
  },
]

const badgeData = badgeDataFactory()

onBeforeMount(async () => {
  const serverData = await initHandler()
  mapServerDataToInitialDataHandler(badgeData.value, serverData)
})

const submitDataHandler = async () => {
  convertFieldToNumber('value', badgeData.value)
  await validateAndChangeServerDataHandler(badgeData.value)
}
</script>

<template>
  <content-layout>
    <template #content-title>
      {{ t('pages.LabelSettingsBadge.pageTitle') }}
    </template>

    <template #content-body>
      <hint-collapse :hints="hints"></hint-collapse>

      <a-card style="margin: 8px 0; background-color: #f6f6f6" disabled="true">
        <h2>{{ t('pages.LabelSettingsBadge.bodyTitle') }}</h2>

        <div class="flex flex-wrap items-center mt-4">
          <a-input
            v-for="(badge, index) in badgeData"
            :key="index"
            v-model:value="badge.value"
            type="number"
            :placeholder="t('pages.LabelSettingsBadge.inputPlaceHolder')"
            class="my-1 mx-1"
            style="width: 320px"
          >
            <template #addonAfter>
              <span class="px-3 py-2">
                {{ t('pages.LabelSettingsBadge.inputUnit') }}
              </span>
            </template>

            <template #addonBefore>
              <input-badge-label
                class="px-3 flex items-center"
                :background-color="badge.backgroundColor"
                :outline-color="badge.outlineColor"
                :text-color="badge.textColor"
                :title="badge.title"
              />
            </template>
          </a-input>
        </div>
      </a-card>

      <div class="text-left">
        <a-button
          type="primary"
          style="padding: 0 56px"
          class="button-secondary"
          @click="submitDataHandler"
        >
          ثبت تغییرات
        </a-button>
      </div>
    </template>
  </content-layout>
</template>
