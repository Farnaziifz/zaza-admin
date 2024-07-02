import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { dashboardConfig } from '@/resources/router/dashboard.config'
import { brandsConfig } from '@/resources/router/brand.config'
import { TagsConfig } from '@/resources/router/tag.config'
import { CategoryConfig } from '@/resources/router/category.config'
import Login from '@/presentation/pages/Login.vue'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Main',
      component: Main,
      children: [dashboardConfig, brandsConfig, TagsConfig, CategoryConfig],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
}
export default config
