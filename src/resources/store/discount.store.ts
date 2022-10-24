import { defineStore } from 'pinia'
import { discounts, discountSecondStep } from '../../core/types/discounts.type'
export const useDiscountStore = defineStore('discount-store', {
  state: (): discounts => ({
    title: '',
    type: '',
    consumeType: '',
    stateType: '',
    amount: 0,
    code: '',
    startAt: '',
    expireAt: '',
  }),

  actions: {
    changeDiscountSetting(discountData: discounts) {
      this.title = discountData.title
      this.amount = discountData.amount
      this.code = discountData.code
      this.startAt = discountData.startAt
      this.expireAt = discountData.expireAt
    },
    changeDiscoundSecondStep(discountData: discountSecondStep) {
      this.type = discountData.type
      this.consumeType = discountData.consumeType
      this.stateType = discountData.stateType
    },
  },
})
