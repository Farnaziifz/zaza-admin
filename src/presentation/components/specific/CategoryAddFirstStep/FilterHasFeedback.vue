<script lang="ts" setup>
import { ref, watch } from 'vue'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'

const emits = defineEmits(['update:value'])

//
// const passOrderRangeToParents = () =>

const hasFeedback = ref('')
watch(
  hasFeedback,
  () => {
    emits('update:value', {
      value: hasFeedback.value === 'true',
      type: groupQueryTypeEnum.HAS_FEEDBACK,
      to: null,
      from: null,
    })
  },
  { deep: true }
)
</script>

<template>
  <div class="flex flex-col">
    <span style="font-weight: 500; font-size: 16px">
      نظر ثبت کرده یا نکرده
    </span>
    <a-radio-group v-model:value="hasFeedback" size="large">
      <a-radio-button value="true" style="width: 50%; text-align: center">
        دارد
      </a-radio-button>
      <a-radio-button value="false" style="width: 50%; text-align: center">
        ندارد
      </a-radio-button>
    </a-radio-group>
  </div>
</template>
