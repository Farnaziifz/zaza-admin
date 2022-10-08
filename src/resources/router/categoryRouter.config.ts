import Category from '@/presentation/pages/Category.vue'
import CategoryAdd from '@/presentation/pages/CategoryAdd.vue'
import CategoryAddFirstStep from '@/presentation/pages/CategoryAddFirstStep.vue'
import CategoryAddSecondStep from '@/presentation/pages/CategoryAddSecondStep.vue'

export const categoryRouterConfig = {
  name: 'category',
  path: 'category',
  component: Category,
  redirect: '/category/add',
  children: [
    {
      name: 'add',
      path: 'add',
      component: CategoryAdd,
      redirect: '/category/add/first-step',
      children: [
        {
          name: 'add-first-step',
          path: 'first-step',
          meta: { step: 0 },
          component: CategoryAddFirstStep,
        },
        {
          name: 'add-second-step',
          path: 'second-step',
          meta: { step: 1 },
          component: CategoryAddSecondStep,
        },
      ],
    },
  ],
}
