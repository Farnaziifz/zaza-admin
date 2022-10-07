import Coupons from '/src/presentation/pages/Coupons.vue'
import CouponsList from '/src/presentation//pages/CouponsList.vue'
import CouponDetail from '/src/presentation/pages/CouponDetails.vue'
import CouponAdd from '/src/presentation/pages/CouoponAdd.vue'
import CouponAddFirstStep from '/src/presentation/pages/CouponAddFirstStep.vue'

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
    {
      path: 'add',
      name: 'coupon-add',
      component: CouponAdd,
      redirect: '/coupons/add/first-step',
      children: [
        {
          path: 'first-step',
          name: 'coupon-add-first-step',
          component: CouponAddFirstStep,
        },
      ],
    },
  ],
}
