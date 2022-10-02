<script lang="ts" setup>
import { businessClassificationTypeEnum } from '@/core/enums/businessClassificationType.enum'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'
import { t } from 'vui18n'
import { ref, watch } from 'vue'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'

const emits = defineEmits(['update:value'])

const businessClassificationSelectValue = ref('')
const businessClassificationOptions: { value: string; label?: string }[] = []
for (const key in businessClassificationTypeEnum) {
  businessClassificationOptions.push({
    value: key,
    label: t(`types.businessClassification.${key}`),
  })
}

watch(
  businessClassificationSelectValue,
  () => {
    emits('update:value', {
      type: groupQueryTypeEnum.BUSINESS_CLASSIFICATION,
      value: businessClassificationSelectValue.value,
      from: null,
      to: null,
    })
  },
  { deep: true }
)
</script>
<template>
  <div class="flex flex-col">
    <span style="font-weight: 500; font-size: 16px">
      {{
        t(
          'pages.CategoryAddFirstStep.modal.BUSINESS_CLASSIFICATION.selectHeadline'
        )
      }}
    </span>
    <b-select
      v-model:value="businessClassificationSelectValue"
      :options="businessClassificationOptions"
      :place-holder="
        t(
          'pages.CategoryAddFirstStep.modal.BUSINESS_CLASSIFICATION.selectPlaceHolder'
        )
      "
    />
    <hr class="my-3" />
  </div>
</template>
