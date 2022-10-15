import Credits from '/src/presentation/pages/Credit.vue'
import CreditList from '/src/presentation/pages/CreditList.vue'
import CreditDetails from '/src/presentation/pages/CreditDetail.vue'
import CreditAdd from '@/presentation/pages/CreditAdd.vue'
import CreditAddFirstStep from '@/presentation/pages/CreditAddFirstStep.vue'
import CreditAddSecondStep from '@/presentation/pages/CreditAddSecondStep.vue'

export const creditRouterConfig = {
  path: 'credits',
  name: 'credits',
  component: Credits,
  redirect: '/credits/list',
  children: [
    {
      path: 'add',
      name: 'add-credit',
      component: CreditAdd,
      redirect: '/credits/add/first-step',
      children: [
        {
          path: 'first-step',
          name: 'add-credit-first-step',
          component: CreditAddFirstStep,
          meta: {
            step: 0,
          },
        },
        {
          path: 'second-step',
          name: 'add-credit-second-step',
          component: CreditAddSecondStep,
        },
      ],
    },
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
