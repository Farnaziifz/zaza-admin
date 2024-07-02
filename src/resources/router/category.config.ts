import Category from '@/presentation/pages/Category/Category.vue'
import CategoryList from '@/presentation/pages/Category/list.vue'
import Add from '@/presentation/pages/Category/Add.vue'

export const CategoryConfig = {
  name: 'category',
  path: 'category',
  component: Category,
  redirect: '/dashboard/category/list',
  children: [
    {
      name: 'category-list',
      path: 'list',
      component: CategoryList,
    },
    {
      name: 'category-add',
      path: 'add',
      component: Add,
    },
  ],
}
