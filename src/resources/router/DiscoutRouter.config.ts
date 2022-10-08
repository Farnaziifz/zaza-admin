import Discount from '/src/presentation/pages/Discount/Discount.vue'
import DiscountList from '/src/presentation/pages/Discount/DiscountList.vue'
import DiscountDetails from '/src/presentation/pages/Discount/DiscountDetails.vue'

export const discountRouterConfig = {
  path: 'discount',
  name: 'discount',
  component: Discount,
  redirect: '/discount/list',
  children: [
    {
      path: 'list',
      name: 'discount-list',
      component: DiscountList,
    },
    {
      path: 'details/:id',
      name: 'discount-details',
      component: DiscountDetails,
    },
  ],
}
