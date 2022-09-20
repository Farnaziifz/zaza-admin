import Credits from '/src/presentation/pages/Credit.vue'
import CreditList from '/src/presentation/pages/CreditList.vue'
import CreditDetails from '/src/presentation/pages/CreditDetail.vue'

export const creditRouterConfig = {
  path: 'credits',
  name: 'credits',
  component: Credits,
  redirect: '/credits/list',
  children: [
    {
      path: 'list',
      name: 'credit-list',
      component: CreditList,
    },
    {
      path: 'details/:id',
      name: 'credit-details',
      component: CreditDetails,
    },
  ],
}
