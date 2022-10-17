import Coupons from '/src/presentation/pages/Coupon/Coupons.vue'
import CouponsList from '/src/presentation/pages/Coupon/CouponsList.vue'
import CouponDetail from '/src/presentation/pages/Coupon/CouponDetails.vue'
import CouponAdd from '/src/presentation/pages/Coupon/CouoponAdd.vue'
import CouponAddFirstStep from '/src/presentation/pages/Coupon/CouponAddFirstStep.vue'
import CouponAddSecondStep from '/src/presentation/pages/Coupon/CouponAddSecondStep.vue'
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
          meta: { step: 0 },
          component: CouponAddFirstStep,
        },
        {
          path: 'second-step',
          name: 'coupon-add-second-step',
          meta: { step: 1 },
          component: CouponAddSecondStep,
        },
      ],
    },
  ],
}
