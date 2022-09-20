import { messageProps } from '@/core/types/message.type'
import { useMainStore } from '@/resources/store/main.store'

export const showMessageToUser = (message: messageProps) => {
  const mainStore = useMainStore()
  message.show = true
  mainStore.setMessage(message)
}

export const showSuccessMessage = (text = 'موفقیت آمیز', key = 1) => {
  showMessageToUser({
    content: text,
    messageKey: key,
    type: 'success',
  })
}

export const showErrorMessage = (text = 'ناموفق', key = 1) => {
  showMessageToUser({
    content: text,
    messageKey: key,
    type: 'error',
  })
}

export const showLoadingMessage = (text = 'درحال ارسال دیتا', key = 1) => {
  showMessageToUser({
    content: text,
    messageKey: key,
    type: 'loading',
  })
}
