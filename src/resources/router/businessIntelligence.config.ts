import BI from '@/presentation/pages/BusinessIntelligence/BI.vue'
import BIChurnRateSettings from '@/presentation/pages/BusinessIntelligence/BIChurnRateSettings.vue'

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
  ],
}