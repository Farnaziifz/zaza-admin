import { Ref, ref } from 'vue'
import { badgeType } from '../../../../core/enums/badgeType.enum'

type labelsDataType = {
  value: undefined | number
  title: string
  type: badgeType
  outlineColor: string
  backgroundColor: string
  textColor: string
}

export const labelsDataFactory = (): Ref<labelsDataType[]> =>
  ref([
    {
      value: undefined,
      title: 'طلایی',
      type: badgeType.GOLD,
      outlineColor: '#ffeb80',
      backgroundColor: '#FFF7CC',
      textColor: '#e3c000',
    },
    {
      value: undefined,
      title: 'نقره ای',
      type: badgeType.SILVER,
      outlineColor: '#E0E0E0',
      backgroundColor: '#F2F2F2',
      textColor: '#7A7A7A',
    },
    {
      value: undefined,
      title: 'برنزی',
      type: badgeType.BRONZE,
      outlineColor: '#E6BF99',
      textColor: '#CD7F32',
      backgroundColor: '#F5E5D6',
    },
  ])
