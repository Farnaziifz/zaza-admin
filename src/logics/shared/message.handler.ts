import { messageProps } from '@/core/types/message.type'
import { useMainStore } from '@/resources/store/main.store'

export const showMessageToUser = (message: messageProps) => {
  const mainStore = useMainStore()
  message.show = true
  mainStore.setMessage(message)
}
