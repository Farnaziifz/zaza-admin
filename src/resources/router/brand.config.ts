import Brands from '@/presentation/pages/Brands/Brand.vue'
import BrandList from '@/presentation/pages/Brands/List.vue'
import AddBrand from '@/presentation/pages/Brands/Add.vue'

export const brandsConfig = {
  name: 'brands',
  path: 'brands',
  component: Brands,
  redirect: '/brands/list',
  children: [
    {
      name: 'brands-list',
      path: 'list',
      component: BrandList,
    },
    {
      name: 'brand-add',
      path: 'add',
      component: AddBrand,
    },
  ],
}
