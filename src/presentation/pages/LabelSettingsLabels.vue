<script setup lang="ts">
import ContentLayout from '../layouts/ContentLayout.vue'
import HintCollapse from '../components/shared/Organisms/HintCollapse.vue'
import { t } from 'vui18n'
import { hintType } from '../../core/types/hints.type'

const hints: hintType[] = [
  {
    body: t('pages.LabelSettingsLabels.hint'),
  },
]
</script>

<template>
  <content-layout>
    <template #content-title> برچسب</template>

    <template #content-body>
      <hint-collapse :hints="hints"></hint-collapse>
    </template>
  </content-layout>
</template>

<style lang="sass"></style>
