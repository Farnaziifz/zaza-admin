import Discount from '/src/presentation/pages/Discount/Discount.vue'
import DiscountList from '/src/presentation/pages/Discount/DiscountList.vue'
import DiscountDetails from '/src/presentation/pages/Discount/DiscountDetails.vue'
import DiscountAdd from '/src/presentation/pages/Discount/DiscountAdd.vue'
import DiscountAddFirstStep from '/src/presentation/pages/Discount/DiscountAddFirstStep.vue'
import DiscountAddSecondStep from '/src/presentation/pages/Discount/DiscountAddSecoundStep.vue'

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
    {
      path: 'add',
      name: 'discount-add',
      component: DiscountAdd,
      redirect: '/discount/add/first-step',
      children: [
        {
          path: 'first-step',
          name: 'discount-add-first-step',
          meta: { step: 0 },
          component: DiscountAddFirstStep,
        },
        {
          path: 'second-step',
          name: 'discount-add-second-step',
          meta: { step: 1 },
          component: DiscountAddSecondStep,
        },
      ],
    },
  ],
}
