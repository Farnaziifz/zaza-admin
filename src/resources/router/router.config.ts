import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { labelSettingsRouterConfig } from './labelSettingsRouter.config'
import { customerRouterConfig } from './CustomersRouter.config'
import { copounsRouterConfig } from './CouponsRouter.config'
import { creditRouterConfig } from './CreditsRouter.config'
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
        creditRouterConfig,
      ],
    },
  ],
  history: createWebHistory(),
}

export default config
