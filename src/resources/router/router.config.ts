import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { labelSettingsRouterConfig } from './labelSettingsRouter.config'
import { customerRouterConfig } from './CustomersRouter.config'
import { copounsRouterConfig } from './CopounsRouter.config'
const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        labelSettingsRouterConfig,
        customerRouterConfig,
        copounsRouterConfig,
      ],
    },
  ],
  history: createWebHistory(),
}

export default config
