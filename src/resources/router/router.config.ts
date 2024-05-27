import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { dashboardConfig } from '@/resources/router/dashboard.config'
import { brandsConfig } from '@/resources/router/brand.config'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/dashboard',
      children: [dashboardConfig, brandsConfig],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
}
export default config
