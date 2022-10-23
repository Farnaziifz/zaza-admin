import { createWebHistory, RouterOptions } from 'vue-router'
import Main from '../../presentation/pages/Main.vue'
import { labelSettingsRouterConfig } from './labelSettingsRouter.config'
import { customerRouterConfig } from './CustomersRouter.config'
import { couponsRouterConfig } from './CouponsRouter.config'
import { creditRouterConfig } from './CreditsRouter.config'
import { categoryRouterConfig } from './categoryRouter.config'

import { discountRouterConfig } from './DiscoutRouter.config'
import { cashbackConfig } from '@/resources/router/cashback.config'
import { scoreConfig } from '@/resources/router/score.config'
import { businessIntelligenceConfig } from '@/resources/router/businessIntelligence.config'
import { reportConfig } from '@/resources/router/report.config'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        labelSettingsRouterConfig,
        categoryRouterConfig,
        customerRouterConfig,
        couponsRouterConfig,
        creditRouterConfig,
        discountRouterConfig,
        cashbackConfig,
        scoreConfig,
        businessIntelligenceConfig,
        reportConfig,
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
}

export default config
