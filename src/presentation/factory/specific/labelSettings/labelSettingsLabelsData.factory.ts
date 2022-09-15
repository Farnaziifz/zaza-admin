import { ref } from 'vue'

export const labelsDataFactory = () =>
  ref([
    {
      value: '',
      title: 'طلایی',
      outlineColor: '#ffeb80',
      backgroundColor: '#FFF7CC',
      textColor: '#e3c000',
    },
    {
      value: '',
      title: 'نقره ای',
      outlineColor: '#E0E0E0',
      backgroundColor: '#F2F2F2',
      textColor: '#7A7A7A',
    },
    {
      value: '',
      title: 'برنزی',
      outlineColor: '#E6BF99',
      textColor: '#CD7F32',
      backgroundColor: '#F5E5D6',
    },
  ])
