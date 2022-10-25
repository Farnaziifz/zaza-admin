import { defineStore } from 'pinia'
import { discounts, discountSecondStep } from '../../core/types/discounts.type'
export const useDiscountStore = defineStore('discount-store', {
  state: (): discounts => ({
    title: '',
    type: '',
    consumeType: '',
    stateType: '',
    code: '',
    startAt: '',
    expireAt: '',
    amount: 0,
    minimumAmount: 0,
    maximumAmount: 0,
    consumeLimitation: 0,
    promotionSteps: [],
  }),

  actions: {
    changeDiscountSetting(discountData: discounts) {
      this.title = discountData.title
      this.code = discountData.code
      this.startAt = discountData.startAt
      this.expireAt = discountData.expireAt
    },
    changeDiscoundSecondStep(discountData: discountSecondStep) {
      this.type = discountData.type
      this.consumeType = discountData.consumeType
      this.stateType = discountData.stateType
      this.amount = discountData.amount
      this.maximumAmount = discountData.maximumAmount
      this.minimumAmount = discountData.minimumAmount
      this.consumeLimitation = discountData.consumeLimitation
      this.promotionSteps = discountData.promotionSteps
    },
  },
})
