<script lang="ts" setup>
import ChevronDownIcon from '../atoms/ChevronDownIcon.vue'
import { ref } from 'vue'

type HintType = {
  body: string
}
type HintCollapseProps = {
  hints: [HintType]
  header: string
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
          {{ props.header }}
        </h2>
      </template>

      <li v-for="(hint, index) in props.hints" :key="index">{{ hint.body }}</li>
    </a-collapse-panel>
  </a-collapse>
</template>
