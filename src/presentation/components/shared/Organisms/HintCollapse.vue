<script lang="ts" setup>
import ChevronDownIcon from '../atoms/ChevronDownIcon.vue'
import { t } from 'vui18n'
import { ref } from 'vue'
import { hintType } from '@/core/types/hints.type'

type HintCollapseProps = {
  hints: hintType[]
  header?: string
}

const props = defineProps<HintCollapseProps>()

const activated = ref([])

const isCollapseActive = (key: string) => {
  let active = false
  activated.value.forEach((el) => {
    if (el === key) active = true
  })

  return active
}
</script>

<template>
  <a-collapse
    v-model:active-key="activated"
    style="background-color: #f6f6f6; box-shadow: none"
    :bordered="false"
  >
    <template #expandIcon="{ isActive }">
      <div style="position: absolute; left: 0">
        <chevron-down-icon
          :color="isActive ? '#1894FF' : '#000'"
          :style="{
            rotate: isActive ? '0deg' : '-180deg',
            transition: 'all 0.2s',
          }"
        />
      </div>
    </template>

    <a-collapse-panel
      :key="1"
      style="background-color: #f6f6f6"
      class="p-4"
      show-arrow
    >
      <template #header>
        <h2 :style="{ color: isCollapseActive('1') ? '#1894FF' : '#000' }">
          {{
            props.header
              ? props.header
              : t('components.organisms.HintCollapse.defaultHeader')
          }}
        </h2>
      </template>

      <li
        v-for="(hint, index) in props.hints"
        :key="index"
        :class="index === 0 ? '' : 'mt-4'"
        style="list-style: disc"
      >
        <span style="font-weight: 500; font-size: 16px">
          {{ hint.body }}
        </span>
        <div style="font-size: 14px; font-weight: 400; color: #888">
          {{ hint.description }}
        </div>
      </li>
    </a-collapse-panel>
  </a-collapse>
</template>
