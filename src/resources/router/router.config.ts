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
import { commentConfig } from '@/resources/router/commentsRouter.config'
import { dashboardConfig } from '@/resources/router/dashboard.config'

const config: RouterOptions = {
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/dashboard',
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
        commentConfig,
        dashboardConfig,
      ],
    },
  ],
  history: createWebHistory(import.meta.env.BASE_URL),
}

export default config
