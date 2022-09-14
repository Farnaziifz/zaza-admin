<script lang="ts" setup>
import ChevronUpIcon from '../atoms/ChevronUpIcon.vue'

type HintType = {
  body: string
}
type HintCollapseProps = {
  hints: [HintType]
  header: string
}

const props = defineProps<HintCollapseProps>()
</script>

<template>
  <a-collapse
    style="background-color: #f6f6f6; box-shadow: none"
    :bordered="false"
  >
    <template #expandIcon="{ isActive }">
      <div style="position: absolute; left: 0">
        <chevron-up-icon
          color="#1894FF"
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
        <h2>{{ props.header }}</h2>
      </template>

      <li v-for="(hint, index) in props.hints" :key="index">{{ hint.body }}</li>
    </a-collapse-panel>
  </a-collapse>
</template>
