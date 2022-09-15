import { ref } from 'vue'

export enum labelsType {
  GOLDEN = 'طلایی',
  SILVER = 'نقره ای',
  BRONZE = 'برنزی',
}

export const labelsDataFactory = () =>
  ref([
    {
      value: 0,
      title: 'طلایی',
      type: labelsType.GOLDEN,
      outlineColor: '#ffeb80',
      backgroundColor: '#FFF7CC',
      textColor: '#e3c000',
    },
    {
      value: 0,
      title: 'نقره ای',
      type: labelsType.SILVER,
      outlineColor: '#E0E0E0',
      backgroundColor: '#F2F2F2',
      textColor: '#7A7A7A',
    },
    {
      value: 0,
      title: 'برنزی',
      type: labelsType.BRONZE,
      outlineColor: '#E6BF99',
      textColor: '#CD7F32',
      backgroundColor: '#F5E5D6',
    },
  ])
