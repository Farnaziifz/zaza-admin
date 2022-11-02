import BI from '@/presentation/pages/BusinessIntelligence/BI.vue'
import BIChurnRateSettings from '@/presentation/pages/BusinessIntelligence/BIChurnRateSettings.vue'
import BIEvaluation from '@/presentation/pages/BusinessIntelligence/BIEvaluation.vue'
import BILoyaltyEvaluation from '/src/presentation/pages/BusinessIntelligence/BILoyaltyEvaluation.vue'
import BIRetentionRateSetting from '../../presentation/pages/BusinessIntelligence/BIRetantionRateSetting.vue'
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
      name: 'churn-evaluation',
      path: 'churn-evaluation',
      component: BIEvaluation,
    },
    {
      name: 'loyalty-evaluation',
      path: 'loyalty-evaluation',
      component: BILoyaltyEvaluation,
    },
    {
      name: 'retantion-rate-setting',
      path: 'retantion-rate-setting',
      component: BIRetentionRateSetting,
    },
  ],
}
