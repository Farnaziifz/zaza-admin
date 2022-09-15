<script setup lang="ts">
import ContentLayout from '../layouts/ContentLayout.vue'
import HintCollapse from '../components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import { hintType } from '../../core/types/hints.type'
import InputBadgeLabel from '../components/specific/LabelSettings/InputBadgeLabel.vue'
import { labelsDataFactory } from '../factory/specific/labelSettings/labelSettingsLabelsData.factory'

const hints: hintType[] = [
  {
    body: t('pages.LabelSettingsLabels.hint'),
  },
]

const labelsData = labelsDataFactory()
</script>

<template>
  <content-layout>
    <template #content-title>{{
      t('pages.LabelSettingsLabels.pageTitle')
    }}</template>

    <template #content-body>
      <hint-collapse :hints="hints"></hint-collapse>

      <a-card style="margin: 8px 0; background-color: #f6f6f6" disabled="true">
        <h2>{{ t('pages.LabelSettingsLabels.bodyTitle') }}</h2>

        <div class="flex flex-wrap items-center mt-4">
          <a-input
            v-for="(label, index) in labelsData"
            :key="index"
            v-model:value="label.value"
            type="number"
            :placeholder="t('pages.LabelSettingsLabels.inputPlaceHolder')"
            class="my-1 mx-1"
            style="width: 320px"
          >
            <template #addonAfter>
              <span class="px-3 py-2">
                {{ t('pages.LabelSettingsLabels.inputUnit') }}
              </span>
            </template>

            <template #addonBefore>
              <input-badge-label
                class="px-3 flex items-center"
                :background-color="label.backgroundColor"
                :outline-color="label.outlineColor"
                :text-color="label.textColor"
                :title="label.title"
              />
            </template>
          </a-input>
        </div>
      </a-card>
    </template>
  </content-layout>
</template>
