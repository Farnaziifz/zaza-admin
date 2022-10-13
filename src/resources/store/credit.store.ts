import { defineStore } from 'pinia'
import { credit } from '@/core/types/credits.type'

export const useCreditStore = defineStore('credit-store', {
  state: (): credit => ({
    amount: 0,
    startAt: '',
    expireAt: '',
    creditGroups: [],
  }),

  getters: {
    getCreditObject(): credit {
      return {
        amount: this.amount,
        startAt: this.startAt,
        expireAt: this.expireAt,
        creditGroups: this.creditGroups,
      }
    },
  },

  actions: {
    saveCreditDataInStore(creditData: credit) {
      this.amount = creditData.amount
      this.startAt = creditData.startAt
      this.expireAt = creditData.expireAt
      this.creditGroups = creditData.creditGroups
    },
  },
})
