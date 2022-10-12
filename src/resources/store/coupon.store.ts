import { coupons } from '../../core/types/coupons.type'
import { defineStore } from 'pinia'

export const useCouponStore = defineStore('coupon-stor', {
  state: (): coupons => ({
    id: '',
    title: '',
    type: '',
    reward: '',
    createdAt: '',
    value: {
      title: '',
      amount: 0,
    },
    rewardValue: {
      amount: 0,
      title: '',
      discountMaximumPrice: 0,
      discountPercentage: 0,
    },
    isActive: false,
  }),

  actions: {
    changeCouponSettings(couponData: coupons) {
      this.id = couponData.id
      this.title = couponData.title
      this.type = couponData.type
      this.reward = couponData.reward
      this.createdAt = couponData.createdAt
      this.isActive = couponData.isActive
      this.value = {
        title: couponData.value?.title,
        amount: couponData.value?.amount,
      }
      this.rewardValue = {
        amount: couponData.rewardValue?.amount,
        title: couponData.rewardValue?.title,
        discountMaximumPrice: couponData.rewardValue?.discountMaximumPrice,
        discountPercentage: couponData.rewardValue?.discountPercentage,
      }
    },
  },
})
