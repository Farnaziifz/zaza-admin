import Coupons from '/src/presentation/pages/Coupons.vue'
import CouponsList from '/src/presentation//pages/CouponsList.vue'
import CouponDetail from '/src/presentation/pages/CouponDetails.vue'

export const couponsRouterConfig = {
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
    {
      path: 'details/:id',
      name: 'coupon-detail',
      component: CouponDetail,
    },
  ],
}
