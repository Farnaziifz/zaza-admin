import { coupons } from '../../core/types/coupons.type'
import { defineStore } from 'pinia'

export const useCouponStore = defineStore('coupon-store', {
  state: (): coupons => ({
    title: '',
    type: '',
    reward: '',
    value: {
      id: '',
      title: '',
      amount: 0,
    },
    rewardValue: {
      id: '',
      amount: 0,
      title: '',
      discountMaximumPrice: 0,
      discountPercentage: 0,
    },
    selectItem: {
      title: '',
      value: '',
    },
  }),

  actions: {
    changeCouponSettings(couponData: coupons) {
      this.title = couponData.title
      this.type = couponData.type
      this.reward = couponData.reward
      this.value = {
        id: couponData.value?.id,
        title: couponData.value?.title,
        amount: couponData.value?.amount,
      }
      this.rewardValue = {
        id: couponData.rewardValue?.id,
        amount: couponData.rewardValue?.amount,
        title: couponData.rewardValue?.title,
        discountMaximumPrice: couponData.rewardValue?.discountMaximumPrice,
        discountPercentage: couponData.rewardValue?.discountPercentage,
      }
      this.selectItem = {
        title: couponData.selectItem?.title,
        value: couponData.selectItem?.value,
      }
    },
  },
})
