import Discount from '/src/presentation/pages/Discount.vue'
import DiscountList from '/src/presentation/pages/DiscountList.vue'

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
  ],
}
