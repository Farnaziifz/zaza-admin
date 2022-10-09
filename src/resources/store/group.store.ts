import { group } from '@/core/types/group.type'
import { defineStore } from 'pinia'

export const useGroupStore = defineStore('group-store', {
  state: (): group => ({
    from: null,
    to: null,
    queries: [],
    title: '',
  }),
  actions: {
    changeGroupSettings(groupData: group) {
      this.from = groupData.from
      this.to = groupData.to
      this.queries = groupData.queries
      this.title = groupData.title
    },
  },
})
