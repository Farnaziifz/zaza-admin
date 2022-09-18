import { Ref, ref } from 'vue'
import { badgeType } from '../../../../core/enums/badgeType.enum'
import { badgePresentationData } from '../../../../core/types/badge.type'
import { t } from 'vui18n'

export const badgeDataFactory = (): Ref<badgePresentationData[]> =>
  ref([
    {
      value: undefined,
      title: t('types.badge.gold'),
      type: badgeType.GOLD,
      outlineColor: '#ffeb80',
      backgroundColor: '#FFF7CC',
      textColor: '#e3c000',
    },
    {
      value: undefined,
      title: t('types.badge.silver'),
      type: badgeType.SILVER,
      outlineColor: '#E0E0E0',
      backgroundColor: '#F2F2F2',
      textColor: '#7A7A7A',
    },
    {
      value: undefined,
      title: t('types.badge.bronze'),
      type: badgeType.BRONZE,
      outlineColor: '#E6BF99',
      textColor: '#CD7F32',
      backgroundColor: '#F5E5D6',
    },
  ])
