<script setup lang="ts">
import { Modal } from 'ant-design-vue'
import { defineEmits, watch, createVNode, ref } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { LegacyButtonType } from 'ant-design-vue/es/button/buttonTypes'

type BConfirmModalProps = {
  value: boolean
  title?: string
  content?: string
  okText?: string
  cancelText?: string
  modalClass?: string
  okType?: LegacyButtonType | 'success' | 'danger'
}

const props = defineProps<BConfirmModalProps>()
const emits = defineEmits(['update:value', 'ok', 'cancel'])
const confirmActivation = ref(props.value)

watch(
  confirmActivation,
  () => {
    if (confirmActivation.value === true) {
      Modal.confirm({
        title: props.title,
        okText: props.okText,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        visible: props.value,
        content: props.content,
        cancelText: props.cancelText,
        wrapClassName: props.okType === 'success' ? 'success' : 'danger',
        icon: createVNode(ExclamationCircleOutlined),
        onOk: async () => emits('ok'),
        onCancel: async () => emits('cancel'),
      })
    }

    emits('update:value', confirmActivation.value)
  },
  { deep: true }
)

watch(
  props,
  () => {
    confirmActivation.value = props.value
  },
  { deep: true }
)
</script>
<template>
  <div></div>
</template>
<style lang="scss">
.success .ant-btn.ant-btn-primary {
  background-color: #52c41a !important;
  border-color: #52c41a !important;
}

.danger .ant-btn.ant-btn-primary {
  background-color: #f5222d !important;
  border: #f5222d !important;
}
</style>
