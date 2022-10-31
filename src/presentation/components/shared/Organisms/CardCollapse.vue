<script lang="ts" setup>
import { ref } from 'vue'
import ChevronDownIcon from '../atoms/ChevronDownIcon.vue'

const activated = ref([])
type CardCollapseProps = {
  title?: string
}
const props = defineProps<CardCollapseProps>()

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
    style="background-color: red"
    :bordered="false"
    class="collapse-container"
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
        <h2
          class="card-collapse-header"
          :style="{ color: isCollapseActive('1') ? '#1894FF' : '#000' }"
        >
          {{ props.title }}
        </h2>
      </template>
      <div class="content">
        <slot name="body"></slot>
      </div>
    </a-collapse-panel>
  </a-collapse>
</template>

<style lang="scss">
.collapse-container {
  .ant-collapse-item {
    background-color: #fff !important;
    border-bottom: none !important;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1) !important;
  }
  .card-collapse-header {
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;
  }
}
</style>
