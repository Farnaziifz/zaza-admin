import { defineStore } from 'pinia'
import { messageProps } from '@/core/types/message.type'

type mainState = {
  message: messageProps
}
export const useMainStore = defineStore('main', {
  state: (): mainState => ({
    message: {
      show: false,
      content: ' ',
      type: 'info',
      messageKey: undefined,
      duration: 1.5,
      style: undefined,
      icon: undefined,
    },
  }),
  actions: {
    setMessage(message: messageProps) {
      this.message = message
    },
    closeMessage() {
      this.message.show = false
    },
  },
})
