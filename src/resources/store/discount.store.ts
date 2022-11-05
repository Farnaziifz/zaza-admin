import { defineStore } from 'pinia'
import {
  discounts,
  discountSecondStep,
  discountThirdStep,
} from '../../core/types/discounts.type'
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
    promotionAssignedGroups: [],
    notificationType: []
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
    changeDiscountThirdStep(discountData: discountThirdStep) {
      this.promotionAssignedGroups = discountData.promotionAssignedGroups
    },
    emptyDiscountStore() {
      this.title = ''
      this.type = undefined
      this.consumeType = undefined
      this.stateType = undefined
      this.code = undefined
      this.startAt = ''
      this.expireAt = ''
      this.amount = 0
      this.minimumAmount = 0
      this.maximumAmount = 0
      this.consumeLimitation = 0
      this.promotionSteps = []
      this.promotionAssignedGroups = []
    },
  },
})
