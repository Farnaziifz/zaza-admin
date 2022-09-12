import { CascaderOptionType } from 'ant-design-vue/es/cascader'
import { scoreType } from '../enums/scoreType.enum'

export const degreeOptions: CascaderOptionType = [
  {
    value: scoreType.PRICE,
    label: 'به ازای یک مبلغ مشخص',
  },
  {
    value: scoreType.ORDER,
    label: 'به ازای تعداد مشخصی سفارش',
  },
]
