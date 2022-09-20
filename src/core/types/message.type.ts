import { CSSProperties, VNode } from 'vue'

export type messageProps = {
  type: 'success' | 'error' | 'warning' | 'loading' | 'info'
  messageKey?: string | number
  style?: CSSProperties
  duration?: number
  content: string
  show?: boolean
  icon?: VNode
}
