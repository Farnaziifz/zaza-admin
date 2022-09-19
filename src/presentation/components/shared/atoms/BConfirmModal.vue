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
  okType?: LegacyButtonType
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
        okType: props.okType,
        visible: props.value,
        content: props.content,
        class: props.modalClass,
        cancelText: props.cancelText,
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
.test > .ant-btn .ant-btn-primary {
  background-color: #1894ff !important;
}
</style>
