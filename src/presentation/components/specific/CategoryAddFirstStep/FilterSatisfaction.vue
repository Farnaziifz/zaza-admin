<script lang="ts" setup>
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'
import { satisfaction } from '@/core/enums/satisfaction.enum'
import { t } from 'vui18n'
import { ref, watch } from 'vue'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'

const emits = defineEmits(['update:value'])

const satisfactionSelectValue = ref('')
const satisfactionOptions: { value: string; label?: string }[] = []
for (const key in satisfaction) {
  satisfactionOptions.push({
    value: key,
    label: t(`types.satisfaction.${key}`),
  })
}

watch(
  satisfactionSelectValue,
  () => {
    emits('update:value', {
      type: groupQueryTypeEnum.SATISFACTION_LABEL,
      value: satisfactionSelectValue.value,
      from: null,
      to: null,
    })
  },
  { deep: true }
)
</script>
<template>
  <div class="flex flex-col">
    <span style="font-weight: 500; font-size: 16px"> برچسب </span>
    <b-select
      v-model:value="satisfactionSelectValue"
      :options="satisfactionOptions"
      :place-holder="
        t(
          'pages.CategoryAddFirstStep.modal.BUSINESS_CLASSIFICATION.selectPlaceHolder'
        )
      "
    />
    <hr class="my-3" />
  </div>
</template>
