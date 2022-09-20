import Coupons from '/src/presentation/pages/Copouns.vue'
import CouponsList from '/src/presentation//pages/CouponsList.vue'

export const copounsRouterConfig = {
  path: 'coupons',
  name: 'coupons',
  component: Coupons,
  redirect: '/coupons/list',
  children: [
    {
      path: 'list',
      name: 'coupon-list',
      component: CouponsList,
    },
  ],
}
