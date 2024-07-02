import Category from '@/presentation/pages/Category/Category.vue'
import CategoryList from '@/presentation/pages/Category/list.vue'

export const CategoryConfig = {
  name: 'category',
  path: 'category',
  component: Category,
  redirect: '/dashboard/category/list',
  children: [
    {
      name: 'catgeory-list',
      path: 'list',
      component: CategoryList,
    },
  ],
}
