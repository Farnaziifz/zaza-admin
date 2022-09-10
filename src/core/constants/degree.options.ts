import { CascaderOptionType } from 'ant-design-vue/es/cascader'
import { degreeTypeEnum } from '../enums/degreeType.enum'

export const degreeOptions: CascaderOptionType = [
    {
        value: degreeTypeEnum.PER_PRICE,
        label: 'به ازای یک مبلغ مشخص',
    },
    {
        value: degreeTypeEnum.PER_ORDER,
        label: 'به ازای تعداد مشخصی سفارش',
    },
]