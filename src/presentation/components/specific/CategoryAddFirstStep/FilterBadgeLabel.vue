<script lang="ts" setup>
import { badgeType } from '@/core/enums/badgeType.enum'
import { groupQueryTypeEnum } from '@/core/enums/groupQueryTypeEnum'
import { t } from 'vui18n'
import { ref, watch } from 'vue'
import BSelect from '@/presentation/components/shared/atoms/BSelect.vue'

const emits = defineEmits(['update:value'])

const badgeSelectValue = ref('')
const badgeOptions: { value: string; label?: string }[] = []
for (const key in badgeType) {
  badgeOptions.push({
    value: key,
    label: t(`types.badge.${key.toLowerCase()}`),
  })
}

watch(
  badgeSelectValue,
  () => {
    emits('update:value', {
      type: groupQueryTypeEnum.BADGE_LABEL,
      value: badgeSelectValue.value,
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
      v-model:value="badgeSelectValue"
      :options="badgeOptions"
      :place-holder="
        t(
          'pages.CategoryAddFirstStep.modal.BUSINESS_CLASSIFICATION.selectPlaceHolder'
        )
      "
    />
    <hr class="my-3" />
  </div>
</template>
