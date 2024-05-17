import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { dashboardConfig } from '@/resources/router/dashboard.config'


const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/dashboard',
      children: [
        dashboardConfig,
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
}

export default config
