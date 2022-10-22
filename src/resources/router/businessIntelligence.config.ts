import BI from '@/presentation/pages/BusinessIntelligence/BI.vue'
import BIChurnRateSettings from '@/presentation/pages/BusinessIntelligence/BIChurnRateSettings.vue'
import BIEvaluation from '@/presentation/pages/BusinessIntelligence/BIEvaluation.vue'

export const businessIntelligenceConfig = {
  name: 'business-intelligence',
  path: 'business-intelligence',
  component: BI,
  redirect: '/business-intelligence/churn-rate-settings',
  children: [
    {
      name: 'churn-rate-settings',
      path: 'churn-rate-settings',
      component: BIChurnRateSettings,
    },
    {
      name: 'evaluation',
      path: 'evaluation',
      component: BIEvaluation,
    },
  ],
}
