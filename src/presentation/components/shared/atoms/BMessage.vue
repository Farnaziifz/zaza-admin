<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { ref, defineEmits, watch, CSSProperties, VNode } from 'vue'

const emits = defineEmits(['onClose', 'onClick'])

type messageProps = {
  type: 'success' | 'error' | 'warning' | 'loading' | 'info'
  messageKey?: string | number
  style?: CSSProperties
  duration?: number
  content: string
  show?: boolean
  icon?: VNode
}

const props = defineProps<messageProps>()
const showMessage = ref(props.show)
const renderMessage = () =>
  message[props.type]({
    content: props.content,
    duration: props.duration,
    icon: props.icon,
    key: props.messageKey,
    style: props.style,
    onClick: () => emits('onClick'),
    onClose: () => emits('onClose'),
  })

watch(
  props,
  () => {
    if (props.show) renderMessage()
    // showMessage.value = props.show
  },
  { deep: true }
)
watch(
  showMessage,
  () => {
    if (showMessage.value === true) {
      renderMessage()
    }
  },
  { deep: true }
)

// This code renders message at page initialization
if (showMessage.value) renderMessage()
</script>
<template>
  <div id="message"></div>
</template>
