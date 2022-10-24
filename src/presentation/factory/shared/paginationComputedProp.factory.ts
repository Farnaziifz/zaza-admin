import { computed, Ref } from 'vue'
import { pagination } from '@/core/types/pagination.type'

export const composePaginationData = <T>(
  paginationData: Ref<(T & pagination) | undefined>
) =>
  computed(() => ({
    total: paginationData.value?.totalCount ?? 0,
    current: paginationData.value?.page ?? 1,
    pageSize: 10,
  }))