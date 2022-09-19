import { CascaderOptionType } from 'ant-design-vue/es/cascader'
import { degreeType } from '../enums/degreeType.enum'

export const degreeOptions: CascaderOptionType = [
  {
    value: degreeType.PER_PRICE,
    label: 'به ازای یک مبلغ مشخص',
  },
  {
    value: degreeType.PER_ORDER,
    label: 'به ازای تعداد مشخصی سفارش',
  },
]
